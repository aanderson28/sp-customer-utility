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
            console.log(result);
            console.log(toJSON(result));
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    async import(document: ICustomer) {
        try {
            const {_id, ...doc} = document;
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            const res = await collection.updateOne(
                { _id: getMongoId(document._id) },
                { $set:
                    doc
                },
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
