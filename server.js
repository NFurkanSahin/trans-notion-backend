const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// CORS Middleware for handling Cross-Origin Requests
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   next();
// });



const environment = process.env.NODE_ENV;
const apiUrl = environment === 'production' ? process.env.PRODUCTION_API_URL : process.env.DEVELOPMENT_API_URL;


// Email Sending Route
app.post('/send-email', (req, res) => {
  let { name, email, message } = req.body;

  // Nodemailer setup
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Use your SMTP service here
    port: 587,
    secure: false,
    auth: {
      user: 'naimfurkan2@gmail.com', // Your email
      pass: 'bmQEtPJXG0D4zR3V', // Your email password
    },
  });

  let mailOptions = {
    from: 'info@notiontranslation.com', // sender address
    to: "info@notiontranslation.com", // list of receivers or use `email` from the form to send to the person's email
    subject: 'Notion Translation Mesaj Geldi', // Subject line
    text: `Müşteri İsmi: ${name}\nMüşteri maili: ${email}\nMüşteri mesajı: ${message}`, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
      res.send('error'); // or use res.status(500).send(error);
    }
    console.log('Message sent: %s', info.messageId);
    res.send('sent');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});