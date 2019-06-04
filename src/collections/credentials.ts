import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

import ICustomer from '../models/customers';
import ICredentials from '../models/credentials';
import DbClient from '../connect';

const collectionName = 'rl-credentials';

// Create class for Credentials collection
class Credentials {
    // Finds the active credentials for the given customer
    async find(cusDocument: ICustomer) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db().collection(collectionName);
            const result = await collection.findOne({
                $and: [{ customer_id: getMongoId(cusDocument._id) }, { active: true }],
            });
            client.close();
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
            const {_id, customer_id, suppliers, vendors, ...doc} = document;
            const client = await DbClient.connect('destination');
            const collection = client.db().collection(collectionName);
            await collection.updateOne(
                { $and: [{_id: getMongoId(document._id)}, {active: true}] },
                { $set: doc },
                { upsert: true }
            );
            await collection.updateOne(
                { $and: [{_id: getMongoId(document._id)}, {active: true}] },
                { $set:
                    {
                        customer_id: getMongoId(customer_id),
                        suppliers: suppliers.map(supplier => {
                            return getMongoId(supplier);
                        }),
                        vendors: vendors.map(vendor => {
                            return getMongoId(vendor);
                        })
                    }
                }
            );
            client.close();
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Credentials;
