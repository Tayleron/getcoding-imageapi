const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const gm = require('gm');
const request = require('request');


const port = 8888;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    gm('image.jpg')
        .write('original.jpg', (err) => {
        return res.status(200).send()
    });
});

app.post('/', (req, res) => {
    gm('image.jpg')
        .blur(30, 20)
        .write('edit.jpg', (err) => {
        return res.status(200).send()
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
