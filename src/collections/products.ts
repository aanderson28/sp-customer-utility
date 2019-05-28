import getMongoObjectId from '../utils/get-mongo-object-id';
import { IRLVendors } from '../models/vendors';
import toJson from '../utils/to-json';

const connectToDB = require('../connect');

const collectionName = 'wm-products';

// Create a class for handling Products collection
class Products {
    // Find the list of products for each vendor
    async find(vendors: IRLVendors[]) {
        console.log('Product Vendor: ' + vendors[0].id);
        const client = await connectToDB('source');
        const collection = await client.db().collection(collectionName);
        const results = await collection.find(
            {
                vendor:
                    { $in: vendors.map(ven => {
                            return ven.id;
                        })
                    }
            }
        ).toArray();
        client.close();
        return toJson(results);
    }

    async import(documents: any[]) {

    }
}

export default Products;
