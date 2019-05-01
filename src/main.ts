import 'dotenv/config';

const getEnvVars = function() {
    console.log(process.env.SOURCE_DB_USER);
};

console.log(`Source Password: ${process.env.SOURCE_DB_PW}`);
getEnvVars();
