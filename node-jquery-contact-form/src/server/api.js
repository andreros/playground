/**
 * file: api.js
 * description: API main file.
 * author: André Rosa
 */

/**************************************************************************************************************************************/
/* Includes and Variables
/**************************************************************************************************************************************/
var dotenv = require('dotenv');
dotenv.config();

var senderEmailService = process.env.SENDER_EMAIL_SERVICE,
	senderEmail = process.env.SENDER_EMAIL,
	senderEmailPassword = process.env.SENDER_EMAIL_PASSWORD,

	serverUploadFolder = process.env.SERVER_UPLOAD_FOLDER || 'uploads/',
	port = process.env.PORT || 5000,

	// Express API
	express = require('express'), // web framework for creating the API
    app = express(), // define our express app
    router = express.Router(), // get an instance of the express router

    // Express App middlewares
    cors = require('cors'), // enable CORS requests middleware
    multer = require('multer'), // 'multipart/form-data' handling middleware. It only handles 'multipart/form-data' type forms
    multerUpload = multer({ dest: serverUploadFolder }),

    // Utility libraries
    fs = require('fs'), // file system module, access and manage file system

    // Nodemailer library
    nodemailer = require('nodemailer'), // send emails from Node.JS
    // create reusable transporter object using the default SMTP transport
    // to enable google emails sending do not forget to activate less secure apps in your google account
	transporter = nodemailer.createTransport({ service: senderEmailService, auth: { user: senderEmail, pass: senderEmailPassword } });


/**************************************************************************************************************************************/
/* Base setup
/**************************************************************************************************************************************/
// configure app to use cors()
// this will let us respond requests from all origins
app.use(cors());

/**************************************************************************************************************************************/
/* API routes
/**************************************************************************************************************************************/

// GET Routes

/**
 * Test route to make sure everything is working (accessed at GET http://localhost:5000/api/v1)
 */
router.route('/').get(function (req, res) {
    res.json({
        message: 'API v1 up and running!'
    });
});

// POST routes

/**
 * Send Mail Route
 */
router.route('/sendmail').post(multerUpload.single('attachment'), function (req, res) {

    // console.log('===============================================================');
    // console.log('REQUEST req.file: ', req.file);
    // console.log('===============================================================');
    // console.log('REQUEST req.body: ', req.body);
    // console.log('===============================================================');

    // rename uploaded file to its original file name
    fs.rename(req.file.destination + req.file.filename, req.file.destination + req.file.originalname, function() {
		//file renamed successfully, proceed to setup e-mail data
		var emailTemplate = `<p>Full Name: ${(req.body.name ? req.body.name : '-')}</p>
							 <p>Email: ${(req.body.email ? req.body.email : '-')}</p>
							 <p>Phone: ${(req.body.phone ? req.body.phone : '-')}</p>
							 <p>Service: ${(req.body.service ? req.body.service : '-')}</p>
							 <p>Message: ${(req.body.message ? req.body.message : '-')}</p>`
			mailOptions = {
							from: (req.body.email ? req.body.email : senderEmail), // sender address
							to: senderEmail, // list of receivers
							subject: 'New contact received', // Subject line
							text: emailTemplate, // plaintext body
							html: emailTemplate, // html body
							attachments: [
								{
									filename: req.file.originalname,
									path: req.file.destination + req.file.originalname
								}
							]
			};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				return console.log('Nodemailer send error: ', error);
			}
			console.log('Nodemailer message sent: ' + info.response);

			res.json({
				error: (error ? error : '-'),
				info: info
			});
		});
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
