// Import the connection to the MongoDB
const connectToDB = require('../connect');

const collectionName = 'rl-customers';

let customer: any;

class Customer {
    dbInstance: string;
    customerName: string;
    constructor(dbInstance: string, customerName: string) {
        this.dbInstance = dbInstance;
        this.customerName = customerName;
    }

    findCustomer() {
        try {
            connectToDB('source', collectionName).then((result: any) => {
                console.log('Second Result: ' + JSON.stringify(result));
            });
        } catch (e) {
            console.log(e);
        }
    }
};

export default Customer;
