/**
 * file: consumer.js
 * description: Implementation of a remote REST API consumer.
 * author: André Rosa
 */

var request = require('request'); // Simplified HTTP client

/**
 * Module exports.
 * @public
 */
exports.executeRequest = executeRequest;

/**
 * Method responsible for executing a request to a remote API.
 * @param {string} verb The request verb (GET, POST, PUT, PATCH, DELETE).
 * @param {string} endpoint The remote API endpoint.
 * @param {object} data The request data.
 * @param {function} callback Callback function to be executed when the request is fulfilled.
 */
function executeRequest(verb, endpoint, data, callback) {
    switch (verb.toUpperCase()) {
        case 'GET':
            request[verb.toLowerCase()](endpoint, data, function (error, response, body) {
                if (error) {
                    return callback(error);
                }
                if (typeof body === 'string') {
                    body = JSON.parse(body);
                }
                // console.log('API Consumer ' + verb.toUpperCase());
                // console.log('Status: ', response.statusCode);
                // console.log('Body: ', JSON.stringify(body));
                return callback(null, body);
            });
            break;
        case 'PATCH':
        case 'POST':
        case 'PUT':
        case 'DELETE':
            request[verb.toLowerCase()]({
                    url: endpoint,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    form: data
                },
                function (error, response, body) {
                    if (error) {
                        return callback(error);
                    }
                    if (typeof body === 'string') {
                        body = JSON.parse(body);
                    }
                    // console.log('API Consumer ' + verb.toUpperCase());
                    // console.log('Status: ', response.statusCode);
                    // console.log('Body: ', JSON.stringify(body));
                    return callback(null, body);
                });
            break;
        default:
            console.log('Unknown verb ' + verb.toUpperCase());
    }
};
