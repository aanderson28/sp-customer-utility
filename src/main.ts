import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Vendors from './collections/vendors';
import Products from './collections/products';

// Create a new collections objects
const customer = new Customer();
const credentials = new Credentials();
const vendors = new Vendors();
const products = new Products();

// Update all other collections based on customer
const updateCollections = async (customer: any) => {
    const cred = await credentials.find(customer);
    await credentials.import(cred);
    const rlVendors = await vendors.findRL(cred.vendors);
    await vendors.importRL(rlVendors);
    const wmVendors = await vendors.findWM(rlVendors);
    await vendors.importWM(wmVendors);
    const product = await products.find(rlVendors);
    await products.import(product);
};

// Import customer by Customer ID
const importCustomerById = async (customerId: string) => {
    if(customerId) {
        const cusDocument = await customer.find(customerId)
        await customer.import(cusDocument);
        updateCollections(cusDocument);
        console.log('Import Finished');
    } else {
        console.log('Forgot to pass Customer Id');
    }
};

// importCustomerByName('Castle Brands');
importCustomerById(process.argv[2]);
