// Imports the connection to mongodb
const connectToDB = require('../connect');
import { IRLVendors, IWMVendors } from '../models/vendors';
import getMongoId from '../utils/get-mongo-object-id';
import { connect } from 'http2';
import { join } from 'path';

const wmVendors = 'wm-vendors';
const rlVendors = 'rl-vendors';

class Vendors {
    async findRL(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(rlVendors);
        const results = await collection
            .find({
                _id: {
                    $in: vendors.map(x => {
                        return getMongoId(x);
                    }),
                },
            })
            .toArray();
        console.log('Vendor Results: ' + JSON.stringify(results));
        client.close();
        return results;
    }

    async importRL(vendor: IRLVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(rlVendors);
        const result = await collection.update();
        client.close();
    }

    async findWM(vendors: any[]) {
        const client = await connectToDB('source');
        const collection = await client.db().collection(rlVendors);
        const result = await collection.find({});
        client.close();
    }

    async importWM(vendor: IWMVendors) {
        const client = await connectToDB('destination');
        const collection = await client.db().collection(rlVendors);
        const result = await collection.update();
        client.close();
    }
}

export default Vendors;
