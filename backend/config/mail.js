const nodemailer = require('nodemailer');

const mailConfig = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  secure: false,
  auth: {
    user: process.env.MAILID,
    pass: process.env.MAILPASSWORD,
  },
});

module.exports = mailConfig;
