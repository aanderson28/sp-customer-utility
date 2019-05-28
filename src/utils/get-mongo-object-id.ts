import * as mongo from 'mongodb';

// Exports the string as a mongo ObjectID
export default (mongoId: string) => {
    if(mongo.ObjectID.isValid(mongoId)) {
        return new mongo.ObjectID(mongoId);
    } else {
        return mongoId;
    }
};
