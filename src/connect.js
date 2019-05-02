import { MongoClient } from 'mongodb';
import * as config from './config';

const clientPromise = new Promise((resolve, reject) => {
    MongoClient.connect(config.sourceHost, {useNewUrlParser: true }, (err, client) => {
        if(err) {
            reject(err);
        } else {
            resolve(client);
        }
    });
});

module.exports =  (collectionName) => {
    clientPromise.then(client => client.db().collection(collectionName));
};