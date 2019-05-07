import Customer from './collections/customer';
import Credentials from './collections/credentials';

// Create a new Customer objects
const customer = new Customer();
const credentials = new Credentials();

// Returns the customer objects
const getCustomer = async () => {
    const document = await customer.find('Castle Brands');
    console.log('Document: ' + document);
    const cred = await credentials.find(document);
    console.log('Credentials: ' + cred);
    // await customer.importCustomer(document);
};

getCustomer();
