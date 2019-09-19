import DbClient from '../connect';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const database = 'analytics-bff';
const collectionName = 'analytics-viewers';

// Create class for CPGs collection
class Viewers {
    // Find the Viewer from the viewer id
    async find(viewerId: string) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            const result = await collection.findOne({ _id: getMongoId(viewerId) });
            client.close();
            return toJSON(result);
        } catch (e) {
            console.error(e);
        }
    }

    // Remove the dashboard from the Viewers dashboard access
    async removeDashboardAccess(viewerDoc: any, dashboardId: string) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            const filteredDashboards = viewerDoc.dashboardAccess.filter(
                (d: string) => d != dashboardId
            );
            await collection.updateOne(
                { _id: getMongoId(viewerDoc._id) },
                { $set: { dashboardAccess: filteredDashboards } },
                { upsert: false }
            );
            client.close();
        } catch (e) {
            console.error(e);
        }
    }
}

export default Viewers;
