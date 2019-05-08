// Imports the connection to mongodb
const connectToDB = require('../connect');
import { IRLVendors, IWMVendors } from '../models/vendors';
import getMongoId from '../utils/get-mongo-object-id';
import toJson from '../utils/to-json';

const wmVendors = 'wm-vendors';
const rlVendors = 'rl-vendors';

class Vendors {
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

    async importRL(vendor: IRLVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(rlVendors);
        const result = await collection.update();
        client.close();
    }

    async findWM(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(wmVendors);
        const results = await collection.find({ vendor: { $in: [vendors[0].id] } }).toArray();
        client.close();
        console.log('Walmart Vendor: ' + JSON.stringify(results));
        return toJson(results);
    }

    async importWM(vendor: IWMVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(wmVendors);
        const result = await collection.update();
        client.close();
    }
}

export default Vendors;
