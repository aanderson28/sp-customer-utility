import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Vendors from './collections/vendors';

// Create a new Customer objects
const customer = new Customer();
const credentials = new Credentials();
const vendors = new Vendors();

// Returns the customer objects
const getCustomer = async () => {
    const cus = await customer.find('Castle Brands');
    console.log('Document: ' + cus);
    const cred = await credentials.find(cus);
    console.log('Credentials: ' + cred);
    const vendor = await vendors.findRL(cred.vendors);
};

getCustomer();
