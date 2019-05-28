import { IRLVendors } from '../models/vendors';
import toJSON from '../utils/to-json';
import IProducts from '../models/products';
import getMongoId from '../utils/get-mongo-object-id';

const connectToDB = require('../connect');

const collectionName = 'wm-products';

// Create a class for handling Products collection
class Products {
    // Find the list of products for each vendor
    async find(vendors: IRLVendors[]) {
        try {
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
            return toJSON(results);
        } catch (e) {
            throw new Error(e);
        }
    }

    // Updates/Inserts the list of product documents
    async import(documents: IProducts[]) {
        try {
            const client = await connectToDB('destination');
            const collection = await client.db().collection(collectionName);
            documents.forEach(async (document, index) => {
                const {_id, ...doc} = document;
                await collection.updateOne(
                    { _id: getMongoId(document._id)},
                    { $set: doc},
                    { upsert: true }
                );
            });
            client.close();
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Products;
