// Create the interface for Retail Link Vendors
interface IRLVendors {
    _id: string;
    id: number;
    name?: string;
    data_available?: string;
}

// Create the interface for Walmart Vendors
interface IWMVendors {
    _id: string;
    vendor: number;
    name?: string;
}

export { IRLVendors, IWMVendors };
