import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Cpg from './collections/cpgs';

// Create a new collections objects
const customer = new Customer();
const cpg = new Cpg();
const credentials = new Credentials();

/*
    Deactivates the customer
    Deactivates the credentials
    Turns off Machine Learning for the specified customerID
*/
const deactivateCustomer = async function (customerId: string) {
    // Find the customer document
    await customer.deactivate(customerId);
    await credentials.deactivate(customerId);
    await cpg.deactivate(customerId);
};

deactivateCustomer(process.argv[2]);
