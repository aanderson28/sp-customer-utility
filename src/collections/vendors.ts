// Imports the connection to mongodb
const connectToDB = require('../connect');
import { IRLVendors, IWMVendors } from '../models/vendors';
import getMongoId from '../utils/get-mongo-object-id';
import toJson from '../utils/to-json';

const wmVendors = 'wm-vendors';
const rlVendors = 'rl-vendors';

// Create class for handling Vendor collections
class Vendors {
    // Finds the list of rl-vendors
    async findRL(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(rlVendors);
        const results = await collection
            .find({
                _id: {
                    $in: vendors.map(vendor => {
                        return getMongoId(vendor);
                    }),
                },
            })
            .toArray();
        client.close();
        return toJson(results);
    }

    // Imports the list of rl-vendors
    // Or inserts if not present
    async importRL(vendor: IRLVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(rlVendors);
        const result = await collection.update();
        client.close();
    }

    // Find the list of wm-vendors
    async findWM(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(wmVendors);
        const results = await collection.find({ vendor: { $in: [vendors[0].id] } }).toArray();
        client.close();
        console.log('Walmart Vendor: ' + JSON.stringify(results));
        return toJson(results);
    }

    // Imports the list of wm-vendors
    // Or inserts if not present
    async importWM(vendor: IWMVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(wmVendors);
        const result = await collection.update();
        client.close();
    }
}

export default Vendors;
