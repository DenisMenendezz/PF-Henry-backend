const nodeMailer = require('nodemailer')
require('dotenv').config
const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})
transporter.verify().then(() => {
    console.log('Ready to send emails');
  }).catch((error) => {
    console.error('Error configuring email transporter:', error);
  });
  
  module.exports = transporter;