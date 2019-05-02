// Require dotenv to setup environment variables
import "dotenv/config";

// Export the list of environment variables
export const database = process.env.DB_NAME;
export const sourceHost = process.env.SOURCE_DB_HOST;
export const sourceUser = process.env.SOURCE_DB_USER;
export const sourcePW = process.env.SOURCE_DB_PW;
export const destinationHost = process.env.DEST_DB_HOST;
export const destinationUser = process.env.DEST_DB_USER;
export const destinationPW = process.env.DEST_DB_PW;
