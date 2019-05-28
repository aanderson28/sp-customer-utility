const { sourceURL, destinationURL } = require('./config');
const { MongoClient } = require('mongodb');
const assert = require('assert');

// Set up the connection to the database
const connectToDB = (dbInstance) => {
    try {
        return new Promise((resolve, reject) => {
            if(dbInstance.toLowerCase() === 'source') {
                MongoClient.connect(sourceURL, {useNewUrlParser: true}, (err, client) => {
                    assert.equal(null, err);
                    if(err) {
                        reject(err);
                    }
                    resolve(client);
                });
            } else {
                if(!destinationURL.includes('ds04', 0)) {
                    MongoClient.connect(destinationURL, {useNewUrlParser: true}, (err, client) => {
                        assert.equal(null, err);
                        if(err) {
                            reject(err);
                        }
                        resolve(client);
                    });
                } else {
                    throw new Error('Destination cannot be Production database.');
                }
            }
        });
    } catch (e) {
        alert(e);
    }
};

module.exports = connectToDB;
