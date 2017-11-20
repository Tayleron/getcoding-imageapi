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

app.post('/crop', upload.array(), (req, res) => {
    let url = request(req.query.url)
    let height = (req.query.h) //set the height param
    let width = (req.query.w) //set the width param
    let x = (req.query.x) //set the x param
    let y = (req.query.y) //set the y param
    let save = (req.query.save) // the set save location

    gm(url)
        .crop(width, height, x, y)
        .write(save, (err) => {
            return res.status(200).send()
        });
});

app.post('/rotate', upload.array(), (req, res) => {
    let url = request(req.query.url)
    let color = (req.query.c) //set color param
    let degrees = (req.query.d) //set degrees param
    let save = (req.query.save) // the set save location

    gm(url)
        .rotate(color, degrees)
        .write(save, (err) => {
            return res.status(200).send()
        });
});

app.post('/resize', upload.array(), (req, res) => {
    let url = request(req.query.url)
    let width = (req.query.w) //set width param
    let height = (req.query.h) //set degrees param
    let save = (req.query.save) // the set save location

    gm(url)
        .resize(width, height)
        .write(save, (err) => {
            return res.status(200).send()
        });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
