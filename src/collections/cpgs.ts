import DbClient from '../connect';
import ICpg from '../models/cpgs';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const database = 'analytics-bff';
const collectionName = 'analytics-cpgs';

// Create class for CPGs collection
class Cpg {
    // Find the CPG from the customer id
    async find(customerId: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            const result = await collection.findOne({
                $and: [
                    { 'dataStreams.streamId': customerId },
                    { 'dataStreams.streamName': 'walmart' },
                ],
            });
            client.close();
            return toJSON(result);
        } catch (e) {
            console.error(e);
        }
    }

    // Import/Update the CPG document in destination
    async import(document: ICpg) {
        try {
            const { _id, ...doc } = document;
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne(
                {
                    $or: [
                        { _id: getMongoId(_id) },
                        {
                            'dataStreams.streamId': {
                                $in: doc.dataStreams.map((streams: any) => {
                                    return streams.streamId;
                                }),
                            },
                        },
                    ],
                },
                { $set: doc },
                { upsert: true }
            );
            client.close();
        } catch (e) {
            console.error(e);
        }
    }

    // Turns off machine learning for this CPG
    async deactivate(customerId: string) {
        try {
            const client = await DbClient.connect('source');
            const collection = client.db(database).collection(collectionName);
            await collection.updateOne(
                { 'dataStreams.streamId': customerId },
                { $set: { 'machineLearning.active': false } }
            );
            client.close();
        } catch (e) {
            console.warn(e);
        }
    }
}

export default Cpg;
