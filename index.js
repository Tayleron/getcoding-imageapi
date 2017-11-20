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

// //app POST requests
// app.post('/', upload.array(), (req, res) => {
//     request(req.body)
//         .pipe(fs.createWriteStream('./uploads/image.jpg'));
//         return res.status(200).send()
// });

app.post('/blur', upload.array(), (req, res) => {
    let url = request(req.query.url) //get the url of the image
    let x = (req.query.x) //set x param
    let y = (req.query.y) //set y param
    let save = (req.query.save) //set save location (will this save to
                                //the server or the user?)
    gm(url)
        .blur(x, y)
        .write(save, (err) => {
        return res.status(200).send()
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
