import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

import ICustomer from '../models/customers';
import ICredentials from '../models/credentials';
import DbClient from '../connect';

const database = 'retail-link';
const canada = 'retail-link-canada';
const collectionName = 'rl-credentials';

// Create class for Credentials collection
class Credentials {
    // Finds the active credentials for the given customer
    async find(cusDocument: ICustomer) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            const result = await collection.findOne({
                $and: [{ customer_id: getMongoId(cusDocument._id) }, { active: true }],
            });
            client.close();
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    // Finds the active credntials for the customer_id
    async findByCustomer(customer_id: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            const collection2 = client.db(canada).collection(collectionName);
            const result =
                (await collection.findOne({
                    $and: [
                        {
                            customer_id:
                                typeof customer_id == 'string'
                                    ? getMongoId(customer_id)
                                    : customer_id,
                        },
                        { active: true },
                    ],
                })) ||
                (await collection2.findOne({
                    $and: [
                        {
                            customer_id:
                                typeof customer_id == 'string'
                                    ? getMongoId(customer_id)
                                    : customer_id,
                        },
                        { active: true },
                    ],
                }));
            await client.close();
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    /*
        Imports the Credentials document
        Inserts the document if not found
        **Need to ask about handling ObjectIds**
    */
    async import(document: ICredentials) {
        try {
            const { _id, customer_id, suppliers, vendors, ...doc } = document;
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne(
                { $and: [{ _id: getMongoId(document._id) }, { active: true }] },
                { $set: doc },
                { upsert: true }
            );
            await collection.updateOne(
                { $and: [{ _id: getMongoId(document._id) }, { active: true }] },
                {
                    $set: {
                        customer_id: getMongoId(customer_id),
                        suppliers: suppliers.map((supplier) => {
                            return getMongoId(supplier);
                        }),
                        vendors: vendors.map((vendor) => {
                            return getMongoId(vendor);
                        }),
                    },
                }
            );
            client.close();
        } catch (e) {
            throw new Error(e);
        }
    }

    // Sets the rl-credentials active flag to false
    async deactivate(customerId: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne(
                { customer_id: getMongoId(customerId), active: true },
                { $set: { active: false } }
            );
            client.close();
        } catch (e) {
            console.warn(e);
        }
    }
}

export default Credentials;
