import * as request from 'request'; // Simplified HTTP client

export class Request {

    public static readonly REQUEST_HEADER_PARAMS: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    /**
     * Method responsible for executing a request to a remote API.
     * @param {string} method The request method (GET, POST, PUT, PATCH, DELETE).
     * @param {string} endpoint The remote API endpoint.
     * @param {any} data The request data.
     * @param {Function} callback Callback function to be executed when the request is fulfilled.
     */
    public static executeRequest = (method: string, endpoint: string, data: any, callback: Function) => {
        let params: request.UrlOptions = (<any>Object).assign(Request.REQUEST_HEADER_PARAMS);
        params.url = endpoint;
        let cb = (error: any, response: request.Response, body: any): void => {
            if (error) {
                return callback(error);
            }
            if (typeof body === 'string') {
                body = JSON.parse(body);
            }
            // console.log('API Request Verb: ' + verb.toUpperCase());
            // console.log('Status: ', response.statusCode);
            // console.log('Body: ', JSON.stringify(body));
            return callback(null, body);
        };

        switch (method.toUpperCase()) {
            case 'GET':
                request.get(params, cb);
                break;
            case 'PATCH':
                request.patch(params, cb);
                break;
            case 'POST':
                request.post(params, cb);
                break;
            case 'PUT':
                request.put(params, cb);
                break;
            case 'DELETE':
                request.delete(params, cb);
                break;
            default:
                console.log('Unknown / invalid method ' + method.toUpperCase());
        }
    }

}
