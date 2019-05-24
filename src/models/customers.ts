// Create the Customer Interface
export default interface ICustomer {
    _id: string;
    name: string;
    active?: boolean;
    vendor_filter?: string[];
}
