// Require dotenv to setup environment variables
import 'dotenv/config';

// Export the list of environment variables
export const database = process.env.DB_NAME;
export const sourceHost = process.env.SOURCE_DB_HOST;
export const sourcePort = process.env.SOURCE_DB_PORT;
export const sourceUser = process.env.SOURCE_DB_USER;
export const sourcePW = process.env.SOURCE_DB_PW;
export const destinationHost = process.env.DEST_DB_HOST;
export const destinationPort = process.env.DEST_DB_PORT;
export const destinationUser = process.env.DEST_DB_USER;
export const destinationPW = process.env.DEST_DB_PW;

// Export the Source environments URL
export const sourceURL = [
    'mongodb://',
    sourceUser + ':',
    sourcePW,
    sourceHost + '/',
    database + '?',
    `replicaSet=rs-ds0${sourcePort}`,
].join('');

// Export the Destination environments URL
export const destinationURL = [
    'mongodb://',
    destinationUser + ':',
    destinationPW,
    destinationHost + ':',
    database + '?',
    `replicaSet=rs-ds0${destinationPort}`,
].join('');
