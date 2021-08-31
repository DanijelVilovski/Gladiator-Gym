const nodemailer = require('nodemailer');
const { google } = require('googleapis');

exports.sendMail = (req, res, next) => {

const CLIENT_ID = '603923741224-v0ciiilg4ekohdo74v3fk23on1vc1en9.apps.googleusercontent.com';
const CLIENT_SECRET = '6FOc2ScONB75zOkf0lB1GWMf';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Y9NIL-TG4qgCgYIARAAGAQSNwF-L9IrUg065yhl4GLAZS9Flvqyi5Qz1ZxRDBFChwAWRCMrdqgQg1cx9vFwtrXOqiH4rECPQDw';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();
const from = req.body.email;
const fullName = req.body.fullName;
const subject = req.body.subject;
const message = req.body.message;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "danivilovski@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    }
    });

var mailOptions = {
    from: fullName + from,
    to: 'danivilovski@gmail.com',
    subject: subject,
    text: message
};

transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

res.status(201).json({
    message: 'Email sent'
  });
};