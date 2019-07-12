import { sourceURL, destinationURL } from './config';
import { MongoClient } from 'mongodb';

// Create a class to work with Mongo
class DbClient {
    // Connect to the mongo instance
    async connect(dbInstance: string) {
        try {
            if(!destinationURL.includes('prod')) {
                return dbInstance.toLowerCase() === 'source'
                    ? await MongoClient.connect(sourceURL, {useNewUrlParser: true})
                    : await MongoClient.connect(destinationURL, {useNewUrlParser: true});
            }
        } catch (error) {
            console.log('Unable to connect to the database');
        }
    }
}

export default new DbClient;
