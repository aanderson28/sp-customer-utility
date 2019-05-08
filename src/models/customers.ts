// Create the Customer Interface
export default interface ICustomer {
    _id: string;
    name: string;
    acitve?: boolean;
    vendor_filter?: string[];
}
