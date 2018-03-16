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
    firebase = require('firebase');

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
/* Firebase Database connection setup
/* https://firebase.google.com/docs/web/setup
/**************************************************************************************************************************************/
var config = {
    apiKey: "AIzaSyDov9Xb_qfM2EUoWcnZCd1w9e2x0rbrWRA",
    authDomain: "to-do-list-90dc1.firebaseapp.com",
    databaseURL: "https://to-do-list-90dc1.firebaseio.com/"
};
firebase.initializeApp(config);
var database = firebase.database();

/**************************************************************************************************************************************/
/* API routes
/* https://firebase.google.com/docs/database/web/read-and-write
/**************************************************************************************************************************************/

// GET Routes
router.route('/tasks').get(function (req, res) {
    database.ref().child('tasks').once('value').then(function (snapshot) {
        console.log('GET /tasks: ', snapshot.val());
        res.json(snapshot.val());
    });
});

router.route('/tasks/:taskId').get(function (req, res) {
    database.ref().child('tasks/task' + req.params.taskId).once('value').then(function (snapshot) {
        console.log('GET /tasks/:taskId: ', snapshot.val());
        res.json(snapshot.val());
    });
});

// OTHER Verbs Routes
router.route('/tasks').post(function (req, res) {
    // New task entry.
    var newTask = {
        name: 'new task',
        description: 'new task description'
    };

    // Get a key for a new task.
    var newTaskKey = firebase.database().ref().child('tasks').push().key;

    // Write the new task's data in the task list.
    var updates = {};
    newTask.key = newTaskKey;
    updates['/tasks/task' + newTaskKey] = newTask;

    database.ref().update(updates, function(response) {
        console.log('POST /tasks response: ');
        console.log(newTask);
        res.json(newTask);
    });
});

router.route('/tasks/:taskId').put(function (req, res) {
    // Task data to be updated.
    var updatedTask = {
        key: req.params.taskId,
        name: 'task update',
        description: 'task update description'
    };

    // Write the updated task's data in the task list.
    var updates = {};
    updates['/tasks/task' + req.params.taskId] = updatedTask;

    database.ref().update(updates, function(response) {
        console.log('PUT /tasks response: ');
        console.log(updatedTask);
        res.json(updatedTask);
    });
});

router.route('/tasks/:taskId').delete(function (req, res) {
    // delete task
    database.ref().child('tasks').child('task' + req.params.taskId).set(null);
    console.log('DELETE /tasks/task' + req.params.taskId + ' response: ');
    res.json({});
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
