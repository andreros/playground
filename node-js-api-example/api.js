// api.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');    // body parsing middleware

var coloredcoins = require("./coloredcoins.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var key = 'cNBYCMNW9vX2iLJ1rTjFQhYvxBqav1B9chvyQP7wNmmTiVKiMLNz';
var address = 'mqdgaKs996taydSkYoEXdSpXgn6SdW9Vm9';

router.route('/createaddress').get(function(req, res) {
    var address = coloredcoins.createAddress();
    res.json(address);
});

router.route('/issue').get(function(req, res) {
    // asset data
    var asset = {
        'issueAddress': address,
        'amount': 1,
        'divisibility': 0,
        'fee': 5000,
        'reissueable': false,
        'transfer': [{
            'address': address,
            'amount': 1
        }],
        'metadata': {
            'assetId': '1',
            'assetName': 'Void Asset Name',
            'issuer': 'Void Software',
            'description': 'Test Digital Asset',
            'urls': [{name:'icon', url: 'http://void.software/images/void_logo.png', mimeType: 'image/png', dataHash: ''}],
            'userData': {
                'meta' : [
                    {key: 'Item ID', value: 2, type: 'Number'},
                    {key: 'Item Hash', value: '123456789abcdefghijklmnopqrstuvxz', type: 'String'},
                    {key: 'Item Name', value: 'Quote XPTO', type: 'String'},
                    {key: 'Company', value: 'Void software', type: 'String'},
                    {key: 'Address', value: 'Leiria, Portugal', type: 'String'}
                ]
            }
        }
    };

    // issue asset
    coloredcoins.postApi('issue', asset, function(err, response) {
        if (err) console.log('error: ', err);
        
        var asset = response;
        var unsignedTx = asset.txHex;
        var wif = key;
        // sign the transaction
        var signedTxHex = coloredcoins.signTx(unsignedTx, wif);
        var transaction = { 'txHex': signedTxHex };
        
        // broadcast the transaction
        coloredcoins.postApi('broadcast', transaction, function(err, response) {
            if (err) console.log('error: ', err);
            response.testUrl = 'http://coloredcoins.org/explorer/testnet/asset/' + asset.assetId + '/' + response.txid[0].txid + '/0';
            res.json(response);
        });
    });
});

router.route('/signTx').post(function(req, res) {
    var isValid = true;
    var errors = {};
    
    if (req.body.unsignedTx === undefined) {
        errors.unsignedTx = 'parameter is undefined';
        isValid = false;
    }
    if (req.body.wif === undefined) {
        errors.wif = 'parameter is undefined';
        isValid = false;
    }
    
    if (isValid) {
        var response = coloredcoins.signTx(req.body.unsignedTx, req.body.wif);
        res.json(response);
    } else {
        var response = { errors: errors };
        console.log(response);
        res.json(response);
    }
});

router.route('/broadcast/:signedTxHex').get(function(req, res) {
    var transaction = { 'txHex': req.params.signedTxHex };
    coloredcoins.postApi('broadcast', transaction, function(err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/assetmetadata/:assetId').get(function(req, res) {
    //get asset metadata
    coloredcoins.getApi('assetmetadata', req.params.assetId , function(err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/assetmetadata/:assetId/:txId').get(function(req, res) {
    var utxo = req.params.txId + ':0';
    //get asset metadata
    coloredcoins.getApi('assetmetadata', req.params.assetId + '/' + utxo , function(err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/addressinfo/:address').get(function(req, res) {
    //get address info
    coloredcoins.getApi('addressinfo', req.params.address , function(err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/v1)
router.route('/').get(function(req, res) {
    res.json({ message: 'API v1 up and running!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);