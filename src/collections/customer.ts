import { database } from "../config";

// Import the connection to the MongoDB
const connectToDB = require('../connect');

const collectionName = 'rl-customers';

class Customer {
    dbInstance: string;
    constructor(dbInstance: string) {
        this.dbInstance = dbInstance;
    }

    async findCustomer(customerName: string) {
        try {
            await connectToDB(this.dbInstance, collectionName).then((client: any) => {
                const db = client.db();

                db
                    .collection(collectionName)
                    .find({name: customerName})
                    .toArray((err: any, data: any) => {
                        if(data) {
                            console.log('Second Result: ' + JSON.stringify(data[0]));
                        } else {
                            throw new Error(err);
                        }
                    });
                client.close();
            });
        } catch (e) {
            console.log(e);
        }
    }

    async importCustomer(document: object) {
        try {

        } catch (e) {
            throw new Error(e);
        }
    }
};

export default Customer;
