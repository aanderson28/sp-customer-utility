// Create the interface for Credentials
export default interface ICredentials {
    _id: string;
    username: string;
    customer_id: string;
    password: string;
    suppliers: string[];
    vendors: string[];
    email: string;
    first_name: string;
    last_name: string;
    active: boolean;
    expired: boolean;
}
