/**
 * file: api.js
 * description: API main file.
 * author: André Rosa
 */

// includes
var express = require('express'), // web framework for creating the API
    cors = require('cors'), // enable CORS requests
    app = express(), // define our express app
    bodyParser = require('body-parser'), // body parsing middleware
    router = express.Router(), // get an instance of the express router
    fs = require('fs'),
    _ = require('underscore');

/**************************************************************************************************************************************/
/* Base setup
/**************************************************************************************************************************************/
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// configure app to use cors()
// this will let us respond requests from all origins
app.use(cors());

var port = process.env.PORT || 5000; // set our port

/**************************************************************************************************************************************/
/* API routes
/**************************************************************************************************************************************/

// GET Routes
router.route('/options').get(function (req, res) {
    var payload;
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) throw err;
        payload = JSON.parse(data);
        // sort by ID ascending
        payload = _.sortBy(payload, function(item) {
            return item.id;
        });
        // sort by ID descending
        // payload = _.sortBy(payload, function(item) {
        //    return -item.id;
        // });
        console.log('GET /options: ', payload);
        res.json(payload);
    });
});

router.route('/options/:searchTerm').get(function (req, res) {
    var payload;
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) throw err;
        payload = JSON.parse(data);
        // search all fields for the search term, case insensitive
        payload = _.filter(payload, function(item) {
            return String(item.id).toLowerCase().includes(req.params.searchTerm.toLowerCase()) ||
                   String(item.name).toLowerCase().includes(req.params.searchTerm.toLowerCase()) ||
                   String(item.value).toLowerCase().includes(req.params.searchTerm.toLowerCase());
        });
        console.log('GET /options/' + req.params.searchTerm, payload);
        res.json(payload);
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api/v1)
router.route('/').get(function (req, res) {
    res.json({
        message: 'API v1 up and running!'
    });
});


/**************************************************************************************************************************************/
/* Register API routes
/**************************************************************************************************************************************/

// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

/**************************************************************************************************************************************/
/* Start the API (server)
/**************************************************************************************************************************************/

app.listen(port);
console.log('Magic happens on port ' + port);