const { getUrl } = require('./utils/dynamoDb');

exports.handler = async (event) => {
    try {
       
        const id = event.pathParameters.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'URL ID is required' })
            };
        }

        const urlMapping = await getUrl(id);

        if (!urlMapping || !urlMapping.originalUrl) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'URL not found' })
            };
        }

        return {
            statusCode: 301,
            headers: {
                'Location': urlMapping.originalUrl
            }
        };
    } catch (error) {
        console.error('Error redirecting URL:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not redirect to URL' })
        };
    }
};