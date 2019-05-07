// Import the connection to the MongoDB
import getMongoId from '../utils/get-mongo-object-id';
const connectToDB = require('../connect');

const collectionName = 'rl-customers';

class Customer {
    async find(customerName: any) {
        try {
            const client = await connectToDB('source');
            const collection = await client.db().collection(collectionName);
            const result = await collection.findOne({ name: customerName });
            client.close();
            return JSON.stringify(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    async importCustomer(document: any) {
        try {
            const id = getMongoId(JSON.parse(document)._id);
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            const res = await collection.updateOne(
                { _id: id },
                { document },
                { upsert: false }
            );
            client.close();
            console.log(res);
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Customer;
