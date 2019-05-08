import getMongoObjectId from '../utils/get-mongo-object-id';

const connectToDB = require('../connect');

const collectionName = 'wm-products';

class Products {
    async find(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(collectionName);
        const results = await collection.find({ _id: { $in: vendors } }).toArray();
        client.close();
        console.log(JSON.stringify(results));
        return results;
    }
}

export default Products;
