const connectToDB = require('../connect');
import ICustomer from '../models/customers';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const collectionName = 'rl-customers';

// Create class for the Customers collection
class Customer {
    // Find the Customer based on the Customer _ID
    async find(customerName: string) {
        try {
            const client = await connectToDB('source');
            const collection = client.db().collection(collectionName);
            const result = await collection.findOne({_id: getMongoId(customerName)});
            client.close();
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    // Imports the Customer document
    // Inserts the document if not found
    async import(document: ICustomer) {
        try {
            const {_id, ...doc} = document;
            const client = await connectToDB('destination');
            const collection = client.db().collection(collectionName);
            await collection.updateOne(
                { _id: getMongoId(document._id) },
                { $set:
                    doc
                },
                { upsert: true }
            );
            client.close();
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Customer;
