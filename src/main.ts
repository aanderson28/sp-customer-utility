import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Vendors from './collections/vendors';
import Products from './collections/products';

// Create a new collections objects
const customer = new Customer();
const credentials = new Credentials();
const vendors = new Vendors();
const products = new Products();

// Import customer by Customer ID
const importCustomerById = async (customerId: string) => {
    if(customerId) {
        // Find and import the customer document
        const cusDocument = await customer.find(customerId);
        await customer.import(cusDocument);
        // Find & Import the credentials document
        const cred = await credentials.find(cusDocument);
        await credentials.import(cred);
        // Find & Import the rl-vendors documents
        const rlVendors = await vendors.findRL(cred.vendors);
        await vendors.importRL(rlVendors);
        // Find & Import the wm-vendors documents
        const wmVendors = await vendors.findWM(rlVendors);
        await vendors.importWM(wmVendors);
        // Find & Import the product documents
        const product = await products.find(rlVendors);
        await products.import(product);
        console.log('Import Finished');
    } else {
        console.error('Forgot to pass Customer Id');
    }
};

// importCustomerByName('Castle Brands');
importCustomerById(process.argv[2]);
