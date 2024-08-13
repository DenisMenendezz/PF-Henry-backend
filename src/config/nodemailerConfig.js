
require('dotenv').config
const nodeMailer = require('nodemailer')
const transporter = nodeMailer.createTransport({
  service: 'gmail', // o el servicio que estés usando
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify().then(() => {
    console.log('Ready to send emails');
  }).catch((error) => {
    console.error('Error configuring email transporter:', error);
  });
  
  module.exports = transporter;