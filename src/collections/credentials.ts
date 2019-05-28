import getMongoId from '../utils/get-mongo-object-id';
import toJson from '../utils/to-json';

import ICustomer from '../models/customers';
import ICredentials from '../models/credentials';
const connectToDB = require('../connect');

const collectionName = 'rl-credentials';

// Create class for Credentials collection
class Credentials {
    // Finds the active credentials for the given customer
    async find(cusDocument: ICustomer) {
        try {
            const client = await connectToDB('source');
            const collection = await client.db().collection(collectionName);
            const result = await collection.findOne({
                $and: [{ customer_id: getMongoId(cusDocument._id) }, { active: true }],
            });
            client.close();
            return toJson(result);
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
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            const res = await collection.updateOne(
                { $and: [{_id: getMongoId(document._id)}, {active: true}] },
                { $set: doc },
                { upsert: false }
            );
            const res2 = await collection.updateOne(
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
