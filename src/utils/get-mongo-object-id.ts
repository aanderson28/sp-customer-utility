import * as mongo from 'mongodb';

// Exports the string as a mongo ObjectID
export default (mongoId: string) => {
    return new mongo.ObjectID(mongoId);
};
