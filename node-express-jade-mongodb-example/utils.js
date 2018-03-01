utils = {

    /**
     * Function responsible for sending an email.
     *
     * @param fromName The sender name.
     * @param fromEmail The sender email address.
     * @param subject The email subject.
     * @param message The email message.
     * @param toList The email TO email address list, comma separated.
     * @param onSuccess (Asynchronous) Event handler for email successful send.
     * @param onError (Asynchronous) Event handler for email error on send.
     *
     * @return int 1 if send was successful, -1 otherwise.
     */
    sendEmail: function(fromName, fromEmail, subject, message, toList, onSuccess, onError) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: config.email
        });

        var mailOptions = {
            from: fromName + ' [ ' + fromEmail + ' ] <' + fromEmail + '>',
            to: toList,
            subject: subject,
            text: message,
            html: '<b>' + message + '</b>' // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                if (typeof(onError) != 'undefined') { onError(error); }
                return -1;
            } else {
                if (typeof(onSuccess) != 'undefined') { onSuccess(info.response); }
                return 1;
            }
        });
    }

};

module.exports = utils;