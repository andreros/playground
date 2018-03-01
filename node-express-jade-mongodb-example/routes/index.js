var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET Home page. */
router.get('/', function(req, res, next) {
    res.render('index', { indexMenuActive: true });
});

/* GET News list page. */
router.get('/news', function(req, res, next) {
    var collection = req.db.get('News');
    collection.find({ active: 1 }, {sort: { creationDate: -1 }}, function(e, docs) {
        console.log(e);
        if (docs != null) {
            res.render('news', { newsMenuActive: true, newsList: docs });
        } else {
            res.render('404', {});
        }
    });
});

/* GET News detail page. */
router.get('/news/:newsId', function(req, res, next) {
    var collection = req.db.get('News');
    collection.findOne({ _id: parseInt(req.param("newsId")), active: 1 }, {}, function(e, docs) {
        if (docs != null) {
            res.render('newsDetail', { newsMenuActive: true, newsDetail: docs });
        } else {
            res.render('404', {});
        }
    });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { contactMenuActive: true });
});

/* POST Contact page. */
router.post('/contact', function(req, res, next) {

    var collection = req.db.get('Contact');
    var now = new Date();
    var response = res;

    // Send the email with the contact form data
    utils.sendEmail(req.body.contactName,
        req.body.contactEmail,
        'Contact from ' + config.project.name,
        req.body.contactMessage,
        config.author.name + ' <' + config.author.contact + '>',
        function(res) {
            console.log('Contact email sent successfully: ' + res);
            // Submit to the DB
            collection.insert({
                "name" : req.body.contactName,
                "email" : req.body.contactEmail,
                "message" : req.body.contactMessage,
                "ip" : req.ip,
                "creationDate" : now.toJSON()
            }, function (err, doc) {
                if (err) {
                    var error = 'Error saving contact message to the database: ' + err;
                    console.log(error);
                    response.render('contact', { contactMenuActive: true, contactSubmitStatus: 'error', contactSubmitError: error });
                } else {
                    response.render('contact', { contactMenuActive: true, contactSubmitStatus: 'success' });
                }
            });
        }, function(error) {
            var err = 'Error sending email: ' + error;
            console.log(err);
            response.render('contact', { contactMenuActive: true, contactSubmitStatus: 'error', contactSubmitError: err });
        });
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {});
});

module.exports = router;