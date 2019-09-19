import DbClient from '../connect';
import getMongoId from '../utils/get-mongo-object-id';
import toJSON from '../utils/to-json';

const database = 'analytics-bff';
const collectionName = 'analytics-dashboards';

// Create class for CPGs collection
class Dashboards {
    // Find the Dashboard Template based on the name
    async findAll(dashboardName: string) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            const results = await collection
                .find({
                    $and: [{ deleted: { $ne: true } }, { isMosaic: true }, { name: dashboardName }],
                })
                .toArray();
            client.close();
            return toJSON(results);
        } catch (e) {
            console.error(e);
        }
    }

    // Updates the dashboard to mark it as deleted
    async delete(dashboards: any[]) {
        try {
            const client = await DbClient.connect('destination');
            const collection = client.db(database).collection(collectionName);
            const today = new Date();
            if (Array.isArray(dashboards)) {
                dashboards.forEach(async (dashboard, index) => {
                    const { created_by } = dashboard;
                    await collection.updateOne(
                        { $and: [{ _id: getMongoId(dashboard._id) }] },
                        {
                            $set: {
                                deleted: true,
                                deleted_by: created_by,
                                deleted_at: today.getTime(),
                                modified_at: today.getTime(),
                                authorizedViewers: [],
                            },
                        },
                        { upsert: false }
                    );
                    if (dashboards.length - 1 === index) {
                        client.close();
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default Dashboards;
