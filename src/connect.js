const { sourceURL, destinationURL, database } = require('./config');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const connectToDB = (dbInstance, collectionName) => {
    try {
        return new Promise((resolve, reject) => {
            if(dbInstance.toLowerCase() === 'source') {
                MongoClient.connect(sourceURL, {useNewUrlParser: true}, (err, client) => {
                    assert.equal(null, err);
                    console.log('Connected Successfully');

                    if(err) {
                        reject(err);
                    }
                    resolve(client);
                });
            } else {
                if(!destinationURL.includes('ds04', 0)) {
                    MongoClient.connect(destinationURL, {useNewUrlParser: true}, (err, client) => {
                        assert.equal(null, err);
                        console.log('Connected Successfully');
                        if(err) {
                            reject(err);
                        }
                        resolve(client);
                    });
                }
            }
        });
    } catch (e) {
        alert(e);
    }
};

module.exports = connectToDB;
// module.exports = (collectionName) => {
//     clientPromise.then(client => client.db(database).collection(collectionName).findOne({}));
// };
