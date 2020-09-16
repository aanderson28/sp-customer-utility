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
    if (customerId) {
        await customer.deactivate(customerId);
        await credentials.deactivate(customerId);
        await cpg.deactivate(customerId);
        console.log('Finished', 'The Customer has been deactivated successfully!');
    }
};

deactivateCustomer(process.argv[2]);
