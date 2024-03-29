import DbClient from '../connect';
import ICustomer from '../models/customers';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const database = 'retail-link';
const collectionName = 'rl-customers';

// Create class for the Customers collection
class Customer {
    // Find the Customer based on the Customer _ID
    async find(customerId: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            const result = await collection.findOne({ _id: getMongoId(customerId) });
            client.close();
            return toJSON(result);
        } catch (e) {
            console.log(e);
        }
    }

    // Find the Customer based on the Customer _ID
    async findList(customerIds: string[]) {
        try {
            const customerObjectIds = customerIds.map((r) => getMongoId(r));
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            const results = await collection.find({
                _id: {
                    $in: customerObjectIds,
                },
            });
            await client.close();
            return toJSON(results);
        } catch (e) {
            console.log(e);
        }
    }

    // Imports the Customer document
    // Inserts the document if not found
    async import(document: ICustomer) {
        try {
            const { _id, ...doc } = document;
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne({ _id: getMongoId(_id) }, { $set: doc }, { upsert: true });
            client.close();
        } catch (e) {
            console.log(e);
        }
    }

    // Set the rl-customer active flag to false
    async deactivate(customerId: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne(
                { _id: getMongoId(customerId) },
                { $set: { active: false } }
            );
            client.close();
        } catch (e) {
            console.warn(e);
        }
    }
}

export default Customer;
