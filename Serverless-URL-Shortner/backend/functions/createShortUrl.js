const { nanoid } = require('nanoid');
const { saveUrl } = require('./utils/dynamoDb');

exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const { url } = requestBody;

        if (!url) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'URL is required' })
            };
        }

        const id = nanoid(7);

     
        const timestamp = new Date().toISOString();


        const urlItem = {
            id,
            originalUrl: url,
            createdAt: timestamp
        };

        await saveUrl(urlItem);
        const shortUrl = `${process.env.BASE_URL}/${id}`;

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                shortUrl,
                originalUrl: url
            })
        };
    } catch (error) {
        console.error('Error creating short URL:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Could not create short URL' })
        };
    }
};