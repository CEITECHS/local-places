"use strict"

/**
 * index.js
 * Created by iddymagohe on 1/22/17.
 */

const apiRouter = require('./app/index');
const bodyParser = require('body-parser');
const express = require('express') ;
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors()); // enable cors for everything

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// configurations
const port = process.env.PORT || 3000;

//basic routes
app.get("/", (req, res) => {
    res.json({
        message: `Hello! The API is at http://localhost:${port}/apis/v1`
    });
});

//API routes
app.use('/apis/v1', apiRouter);

//Global error handling
app.use((err,req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Ops something is broke !!! ",
        error: err.message
    });
});

//start server
app.listen(port, err => {
    if (err) {
        return console.log('There was an issue  in starting the server :' + err);
    }
    console.log('Magic happens at http://localhost:' + port);
});

//TODO docker deployment container to deploy service.

