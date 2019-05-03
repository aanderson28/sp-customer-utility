import Customer from './collections/customer';

// Create a new Customer objects
const customer = new Customer('source', 'Castle Brands');

// Returns the customer objects
const getCustomer = function() {
    customer.findCustomer();
    // console.log(cus);
};

getCustomer();
