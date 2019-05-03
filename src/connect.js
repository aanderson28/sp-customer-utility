const { sourceURL, destinationURL, database } = require('./config');
const { MongoClient } = require('mongodb');
const assert = require('assert');

// const clientPromise = dbInstance => {
//     return new Promise((resolve, reject) => {
//         if (dbInstance.toLowerCase() === 'source') {
//             console.log('Source URL: ' + sourceURL);
//             MongoClient.connect(sourceURL, { useNewUrlParser: true }, (err, client) => {
//                 if (err) {
//                     console.log('Not Connected');
//                     reject(err);
//                 } else {
//                     console.log('Connected');
//                     resolve(client);
//                 }
//             });
//         } else {
//             console.log('Destination URL: ' + destinationURL);
//             MongoClient.connect(destinationURL, { useNewUrlParser: true }, (err, client) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(client);
//                 }
//             });
//         }
//     });
// };

const connectToDB = (dbInstance, collectionName) => {
    try {
        return new Promise((resolve, reject) => {
            if(dbInstance.toLowerCase() === 'source') {
                MongoClient.connect(sourceURL, {useNewUrlParser: true}, (err, client) => {
                    assert.equal(null, err);
                    console.log('Connected Successfully');

                    const db = client.db(database);

                    db
                        .collection(collectionName)
                        .find({name: 'Castle Brands'})
                        .toArray((err, data) => {
                            err
                                ? reject(err)
                                : resolve(data[0]);
                        });
                });
            } else {
                MongoClient.connect(destinationURL, {useNewUrlParser: true}, (err, client) => {
                    assert.equal(null, err);
                    console.log('Connected Successfully');
                });
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
