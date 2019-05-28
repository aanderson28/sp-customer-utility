import { IRLVendors } from '../models/vendors';
import toJson from '../utils/to-json';
import IProducts from '../models/products';
import getMongoId from '../utils/get-mongo-object-id';

const connectToDB = require('../connect');

const collectionName = 'wm-products';

// Create a class for handling Products collection
class Products {
    // Find the list of products for each vendor
    async find(vendors: IRLVendors[]) {
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

    async import(documents: IProducts[]) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(collectionName);
        documents.forEach(async (document, index) => {
            const {_id, ...doc} = document;
            if(document.item_number === '570594041') {
                await collection.updateOne(
                    { _id: getMongoId(document._id)},
                    { $set: doc},
                    { upsert: false }
                );
            }
        });
        client.close();
    }
}

export default Products;
