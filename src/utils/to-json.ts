// Create and Parse a JSON string
export default (jsonObject: string) => {
    if(jsonObject) {
        return JSON.parse(JSON.stringify(jsonObject));
    }
};
