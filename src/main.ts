import Customer from './collections/customer';

// Create a new Customer objects
const customer = new Customer('source');

// Returns the customer objects
const getCustomer = function() {
    customer.findCustomer('Castle Brands');
    // console.log(cus);
};

getCustomer();
