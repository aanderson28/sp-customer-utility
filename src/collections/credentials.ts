// Imports the connection to mongodb
import getMongoId from '../utils/get-mongo-object-id';
const connectToDB = require('../connect');

const collectionName = 'rl-credentials';

class Credentials {
    async find(cusDocument: any) {
        try {
            const customerId = getMongoId(JSON.parse(cusDocument)._id);
            const client = await connectToDB('source');
            const collection = await client.db().collection(collectionName);
            const result = await collection.findOne({customer_id: Object(customerId)});
            client.close();
            return JSON.stringify(result);
        } catch (e) {
            throw new Error(e);
        }
    }

    async import(document: any) {
        try {
            const id = getMongoId(JSON.parse(document)._id);
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            const res = await collection.update({_id: id}, {document}, {upsert: false});
            client.close();
            console.log(res);
        } catch (e) {
            throw new Error(e);
        }
    }
};

export default Credentials;
