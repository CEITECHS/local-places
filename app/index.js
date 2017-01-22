"use strict"
// app/index.js
const express = require('express');
const apiRouter = express.Router();

// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).json({
        message: 'Welcome to the coolest API on earth!'
    });
});

module.exports = apiRouter;