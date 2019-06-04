// Create and Parse a JSON string
export default (jsonObject: any) => {
    if(jsonObject) {
        return JSON.parse(JSON.stringify(jsonObject));
    }
};
