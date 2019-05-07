const { sourceURL, destinationURL } = require('./config');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const connectToDB = (dbInstance) => {
    try {
        return new Promise((resolve, reject) => {
            if(dbInstance.toLowerCase() === 'source') {
                MongoClient.connect(sourceURL, {useNewUrlParser: true}, (err, client) => {
                    assert.equal(null, err);
                    console.log('Connected to Source Successfully');
                    if(err) {
                        reject(err);
                    }
                    resolve(client);
                });
            } else {
                if(!destinationURL.includes('ds04', 0)) {
                    MongoClient.connect(destinationURL, {useNewUrlParser: true}, (err, client) => {
                        assert.equal(null, err);
                        console.log('Connected to Destination Successfully');
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
