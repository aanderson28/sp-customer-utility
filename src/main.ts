import * as config from './config';

const getEnvVars = function() {
    console.log(config.database);
};

console.log(`Source User: ${config.sourceUser}`);
getEnvVars();
