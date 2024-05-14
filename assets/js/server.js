
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Nodemailer to send emails
const transporter = nodemailer.createTransport({
    service: 'your-email-service-provider',
    auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
    },
});

app.post('/submit', (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const message = req.body.message;

    const mailOptions = {
        from: email,
        to: 'chhuzaifaiftikhar@gmail.com',
        subject: `Contact Form Submission from ${fullname}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/error.html'); // Redirect to an error page
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/thank_you.html'); // Redirect to a thank you page
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
