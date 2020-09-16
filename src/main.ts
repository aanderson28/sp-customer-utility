import Customer from './collections/customer';
import Credentials from './collections/credentials';
import Vendors from './collections/vendors';
import Products from './collections/products';
import Cpg from './collections/cpgs';
import Dashboards from './collections/dashboards';
import Viewers from './collections/viewers';

// Create a new collections objects
const customer = new Customer();
const cpg = new Cpg();
const credentials = new Credentials();
const vendors = new Vendors();
const products = new Products();

// Import customer by Customer ID
const importCustomerById = async (customerId: string) => {
    if (customerId) {
        // Find and import the customer document
        const cusDocument = await customer.find(customerId);
        if (cusDocument) {
            await customer.import(cusDocument);
            // Find and import the cpgs document
            const cpgDocument = await cpg.find(customerId);
            await cpg.import(cpgDocument);
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
            console.error(`Import Failed.\r\nNo rl-customer found for ${customerId}`);
        }
    } else {
        console.error('Forgot to pass Customer Id');
    }
};

// const deleteDashboards = async () => {
//     const Dashboard = new Dashboards();
//     const dashboards = await Dashboard.findAll('Walmart Supplier Scorecard');

//     if (Array.isArray(dashboards) && dashboards.length > 0) {
//         dashboards.forEach(dashboard => {
//             console.log('Dashboard ID: ' + dashboard._id);
//             dashboard.authorizedViewers.forEach(async (viewer: string) => {
//                 let Viewer = new Viewers();
//                 let viewerDoc = await Viewer.find(viewer);
//                 await Viewer.removeDashboardAccess(viewerDoc, dashboard._id);
//             });
//         });
//         await Dashboard.delete(dashboards);
//     }
// };

const deactivateCustomer = async function (customerId: string) {
    // Find the customer document
    await customer.deactivate(customerId);
    await credentials.deactivate(customerId);
    await cpg.deactivate(customerId);
};

importCustomerById(process.argv[2]);
// deleteDashboards();
// deactivateCustomer(process.argv[2]);
