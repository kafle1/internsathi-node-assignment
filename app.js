const express = require('express');
const path = require("path");
const sendMail = require('./mailer');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {

    if (!req.body.email) {
        return res.status(400).send('Email is required');
    }
    if (!req.body.subject) {
        return res.status(400).send('Subject is required');
    }
    if (!req.body.message) {
       return res.status(400).send('Message is required');
    }

  // Send email 
    const result = await sendMail(req.body);
    return res.status(200).send('Email sent successfully');
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
