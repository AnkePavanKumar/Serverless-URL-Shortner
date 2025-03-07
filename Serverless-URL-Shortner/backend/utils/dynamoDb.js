const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

const saveUrl = async (urlItem) => {
    const params = {
        TableName: TABLE_NAME,
        Item: urlItem
    };

    return dynamoDb.put(params).promise();
};


const getUrl = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item;
};

module.exports = {
    saveUrl,
    getUrl
};