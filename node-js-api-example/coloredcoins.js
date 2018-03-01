/*!
 * Open source Colored Coins Protocol implementation API communication
 */

/**
 * Module variables.
 * @private
 */
var request = require('request'); // simplified HTTP client
var bitcoin = require('bitcoinjs-lib'); //Bitcoin library

var api_endpoint = 'http://testnet.api.coloredcoins.org:80/v3/';

/**
 * Module exports.
 * @public
 */
exports.createAddress = createAddress;
exports.getApi = getApi;
exports.postApi = postApi;
exports.signTx = signTx;

function createAddress() {
    var key = bitcoin.ECKey.makeRandom({network: bitcoin.networks.testnet});
    //var key = bitcoin.ECKey.makeRandom(); //defaults to the mainnet network?
    var wif = key.toWIF(); //private key in WIF format
    var address = key.getAddress().toString(); //compressed Bitcoin address
    
    return { address: address, key: wif };
};

function getApi(api_method, param, callback) {
    request.get(api_endpoint + api_method + '/' + param, function (error, response, body) {
        if (error) { return callback(error); }
        if (typeof body === 'string') { body = JSON.parse(body); }
        console.log('API getApi');
        console.log('Status:', response.statusCode);
        console.log('Body:', body);
        return callback(null, body);
    });
};

function postApi(api_method, json_data, callback) {
    request.post({
            url: api_endpoint + api_method,
            headers: {'Content-Type': 'application/json'},
            form: json_data
        },
        function (error, response, body) {
            if (error) { return callback(error); }
            if (typeof body === 'string') { body = JSON.parse(body); }
            console.log('API postApi');
            console.log('Status: ', response.statusCode);
            console.log('Body: ', JSON.stringify(body));
            return callback(null, body);
        });
};

function signTx(unsignedTx, wif) {
    var privateKey = bitcoin.ECKey.fromWIF(wif);
    var tx = bitcoin.Transaction.fromHex(unsignedTx);
    var insLength = tx.ins.length;
    for (var i = 0; i < insLength; i++) { tx.sign(i, privateKey); }
    return tx.toHex();
};