// Imports the connection to mongodb
import DbClient from '../connect';
import { IRLVendors, IWMVendors } from '../models/vendors';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const wmVendors = 'wm-vendors';
const rlVendors = 'rl-vendors';

// Create class for handling Vendor collections
class Vendors {
    // Finds the list of rl-vendors pulled from Credentials
    async findRL(vendors: string[]) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db().collection(rlVendors);
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
            return toJSON(results);
        } catch (e) {
            throw new Error(e);
        }
    }

    // Imports the list of rl-vendors documents
    // Or inserts if not present
    async importRL(documents: IRLVendors[]) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db().collection(rlVendors);
            documents.forEach(async (document, index) => {
                const {_id, ...doc} = document;
                await collection.updateOne(
                    { _id: getMongoId(_id) },
                    { $set: doc},
                    { upsert: true }
                );
                if((documents.length - 1) === index) {
                    client.close();
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    // Find the list of wm-vendors
    async findWM(vendors: IRLVendors[]) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db().collection(wmVendors);
            const results = await collection.find(
                { vendor:
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

    // Imports the list of wm-vendors
    // Or inserts if not present
    async importWM(documents: IWMVendors[]) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db().collection(wmVendors);
            documents.forEach(async (document, index) => {
                const {_id, ...doc} = document;
                await collection.updateOne(
                    { _id: getMongoId(_id) },
                    { $set: doc },
                    { upsert: true }
                );
                if((documents.length) - 1 === index) {
                    client.close();
                }
            });
        } catch (e) {
            throw new Error(e);

        }
    }
}

export default Vendors;
