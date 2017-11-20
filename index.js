//Requirement Initialization
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const gm = require('gm');
const request = require('request');

//Secondary Initialization
const port = 8888;
const app = express();
const upload = multer();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));


// //app POST requests
// app.post('/', upload.array(), (req, res) => {
//     request(req.body)
//         .pipe(fs.createWriteStream('./uploads/image.jpg'));
//         return res.status(200).send()
// });

app.post('/blur', upload.array(), (req, res) => {
    let url = request(req.query.url)
    let x = request(req.query.x)
    let y = request(req.query.y)
    gm(url)
        .blur(x, y)
        .write('./uploads/edit.jpg', (err) => {
        return res.status(200).send()
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
