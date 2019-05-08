import getMongoObjectId from '../utils/get-mongo-object-id';

const connectToDB = require('../connect');

const collectionName = 'wm-products';

class Products {
    async find(vendors: any[]) {
        console.log('Product Vendor: ' + vendors[0].id);
        const client = await connectToDB('source');
        const collection = await client.db().collection(collectionName);
        const results = await collection.findOne({ vendor: { $in: [vendors[0].id] } });
        client.close();
        console.log(JSON.stringify(results));
        return results;
    }
}

export default Products;
