// Create and Parse a JSON string
export default (jsonObject: string) => {
    return JSON.parse(JSON.stringify(jsonObject));
};
