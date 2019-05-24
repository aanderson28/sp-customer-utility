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
const getCustomer = async () => {
    const cus = await customer.find('Castle Brands');
    console.log('Customer: ' + cus);
    await customer.import(cus);
    // const cred = await credentials.find(cus);
    // console.log('Credentials: ' + cred._id);
    // const rlVendor = await vendors.findRL(cred.vendors);
    // console.log('RL Vendors: ' + rlVendor[0].id);
    // const wmVendors = await vendors.findWM(rlVendor);
    // // console.log('WM Vendors: ' + wmVendors);
    // const product = await products.find(rlVendor);
    // console.log('Products: ' + product);
};

getCustomer();
