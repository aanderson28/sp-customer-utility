const connectToDB = require('../connect');
import ICustomer from '../models/customers';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';
import toJson from '../utils/to-json';

const collectionName = 'rl-customers';

class Customer {
    async find(customerName: string) {
        try {
            const client = await connectToDB('source');
            const collection = await client.db().collection(collectionName);
            const result = await collection.findOne({ name: customerName });
            client.close();
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    async import(document: ICustomer) {
        try {
            const id = getMongoId(document._id);
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
