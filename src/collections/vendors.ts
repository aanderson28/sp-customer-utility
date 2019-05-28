// Imports the connection to mongodb
const connectToDB = require('../connect');
import { IRLVendors, IWMVendors } from '../models/vendors';
import getMongoId from '../utils/get-mongo-object-id';
import toJson from '../utils/to-json';

const wmVendors = 'wm-vendors';
const rlVendors = 'rl-vendors';

// Create class for handling Vendor collections
class Vendors {
    // Finds the list of rl-vendors pulled from Credentials
    async findRL(vendors: string[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(rlVendors);
        const results = await collection.find(
            {
                _id: {
                    $in: vendors.map(vendor => {
                        return getMongoId(vendor);
                    }),
                },
            }
        ).toArray();
        client.close();
        return toJson(results);
    }

    // Imports the list of rl-vendors documents
    // Or inserts if not present
    async importRL(documents: IRLVendors[]) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(rlVendors);
        documents.forEach(async (document) => {
            const {_id, ...doc} = document;
            await collection.updateOne(
                { _id: getMongoId(_id) },
                { $set: doc},
                { upsert: false }
            );
        });
        client.close();
    }

    // Find the list of wm-vendors
    async findWM(vendors: IRLVendors[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(wmVendors);
        const results = await collection.find(
            { vendor:
                { $in: vendors.map(ven => {
                        return ven.id;
                    })
                }
            }
        ).toArray();
        client.close();
        return toJson(results);
    }

    // Imports the list of wm-vendors
    // Or inserts if not present
    async importWM(documents: IWMVendors[]) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(wmVendors);
        documents.forEach(async (document) => {
            const {_id, ...doc} = document;
            await collection.updateOne(
                { _id: getMongoId(_id) },
                { $set: doc },
                { upsert: false }
            );
        });
        client.close();
    }
}

export default Vendors;