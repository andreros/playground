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
    apiConsumer = require("./consumer.js"); // include our API consumer module

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

var port = process.env.PORT || 8080; // set our port
var targetApiBaseUrl = 'http://jsonplaceholder.typicode.com'; // set our consumed API baseUrl

/**************************************************************************************************************************************/
/* API routes
/**************************************************************************************************************************************/

// GET Routes
router.route('/posts').get(function (req, res) {
    var userIdParam = '';
    if (req.query.userId) {
        userIdParam = '?userId=' + req.query.userId;
    }
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/posts' + userIdParam, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/posts/:postId').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/posts/' + req.params.postId, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/posts/:postId/comments').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/posts/' + req.params.postId + '/comments', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/comments').get(function (req, res) {
    var postIdParam = '';
    if (req.query.postId) {
        postIdParam = '?postId=' + req.query.postId;
    }
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/comments' + postIdParam, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/albums').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/albums', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/photos').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/photos', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/todos').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/todos', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/users').get(function (req, res) {
    apiConsumer.executeRequest('GET', targetApiBaseUrl + '/users', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

// OTHER Verbs Routes
router.route('/posts').post(function (req, res) {
    apiConsumer.executeRequest('POST', targetApiBaseUrl + '/posts', {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/posts/:postId').put(function (req, res) {
    apiConsumer.executeRequest('PUT', targetApiBaseUrl + '/posts/' + req.params.postId, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/posts/:postId').patch(function (req, res) {
    apiConsumer.executeRequest('PATCH', targetApiBaseUrl + '/posts/' + req.params.postId, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

router.route('/posts/:postId').delete(function (req, res) {
    apiConsumer.executeRequest('DELETE', targetApiBaseUrl + '/posts/' + req.params.postId, {}, function (err, response) {
        if (err) console.log('error: ', err);
        res.json(response);
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/v1)
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
