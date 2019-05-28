import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Vendors from './collections/vendors';
import Products from './collections/products';

// Create a new collections objects
const customer = new Customer();
const credentials = new Credentials();
const vendors = new Vendors();
const products = new Products();

// Returns the customer objects
const importCustomerByName = async () => {
    const cus = await customer.find('Castle Brands');
    await customer.import(cus);
    const cred = await credentials.find(cus);
    await credentials.import(cred);
    const rlVendors = await vendors.findRL(cred.vendors);
    await vendors.importRL(rlVendors);
    const wmVendors = await vendors.findWM(rlVendors);
    await vendors.importWM(wmVendors);
    const product = await products.find(rlVendors);
    products.import(product);
};

// Import customer by Customer ID
const importCustomerById = async (customerId: string) => {
    const cusDocument = await customer.find(customerId)
};

importCustomerByName();
