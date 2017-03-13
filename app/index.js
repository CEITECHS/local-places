"use strict"
// app/index.js
const express = require('express');
const apiRouter = express.Router();
const url = require('url')

// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).json({
        message: 'Welcome to the coolest API on earth!'
    });
});

apiRouter.get('/places', (req, res) => {
    let query = url.parse(req.url, true).query;

    res.status(200).json({
        message: query
    });
});

apiRouter.get('/places/:country', (req, res) => {
    let query = url.parse(req.url, true).query;

    res.status(200).json({
        message: query,
        country: req.params.country
    });
});

apiRouter.post('/places/setup', (req, res) => {
    let query = url.parse(req.url, true).query;

    res.status(200).json({
        message: 'set up end-point'
    });
});

module.exports = apiRouter;