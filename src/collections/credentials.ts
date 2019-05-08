import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

import ICustomer from '../models/customers';
import ICredentials from '../models/credentials';
const connectToDB = require('../connect');

const collectionName = 'rl-credentials';

class Credentials {
    async find(cusDocument: ICustomer) {
        try {
            const client = await connectToDB('source');
            const collection = await client.db().collection(collectionName);
            const result = await collection.findOne({
                $and: [{ customer_id: getMongoId(cusDocument._id) }, { active: true }],
            });
            client.close();
            return toJSON(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    async import(document: ICredentials) {
        try {
            const id = getMongoId(JSON.parse(document._id));
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            const res = await collection.update({ _id: id }, { document }, { upsert: false });
            client.close();
            console.log(res);
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Credentials;
