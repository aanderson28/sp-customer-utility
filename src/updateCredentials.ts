import axios from 'axios';
import Credentials from './collections/credentials';
import IUnsuccessfulCreds from './models/unsuccessfulCreds';

// SET TO LIST OF CUSTOMER IDs
const customer_ids = ['CUSTOMER_IDs'];

async function getCredential(customer_id: string) {
    const credentials = new Credentials();
    return await credentials.findByCustomer(customer_id);
}

(async function updateCreds() {
    let unsuccessful: IUnsuccessfulCreds[];
    for (const key in customer_ids) {
        const cred = await getCredential(customer_ids[key]);
        if (cred) {
            let data = JSON.stringify({
                password: cred.password,
            });
            let config = {
                method: 'patch',
                url: `http://localhost:40404/credentials/${cred.username}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            if (cred.expired) {
                try {
                    await axios(config);
                    console.log(
                        `${key} - Credentials Updated for: ${cred.username} - ${customer_ids[key]}`
                    );
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.error(
                            `${key} - Invalid credentials for ${cred.username} - ${customer_ids[key]}`
                        );
                    } else {
                        console.log(`${key} - Error Code:`, error.code);
                        console.log('Error Message:', error.message);
                        console.log('Request Data:', error.config.data);
                        console.log('Request URL:', error.config.url);
                    }
                    // unsuccessful.push({
                    //     customer_id: customer_ids[key],
                    //     username: cred.username,
                    //     error: error.message,
                    // });
                }
            } else {
                console.warn(
                    `${key} - The credentials are not expired: ${cred.username} - ${customer_ids[key]}`
                );
            }
        } else {
            console.warn(`${key} - No credentials found for Customer ID ${customer_ids[key]}`);
            // unsuccessful.push({
            //     customer_id: customer_ids[key],
            //     username: cred,
            //     error: 'No customer found in collection.',
            // });
        }
    }
    if (unsuccessful && unsuccessful.length > 0) {
        console.warn('Unsuccessfully Updated:', unsuccessful);
    }
})();
