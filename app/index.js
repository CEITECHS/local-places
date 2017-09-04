"use strict"

/**
 * @author Iddy Magohe 2017
 */

// app/index.js
const express = require('express');
const apiRouter = express.Router();
const url = require('url');
const config = require('../config')

const readFiles = require('../lib/readFiles');
const Address = require('./model/address');
const placesRepo = require('./repository/addressRepository');
const EMPTY_VALUE = "";

// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).json({
        message: 'Welcome to the coolest API on earth!'
    });
});

apiRouter.get('/places', (req, res) => {
    let query = url.parse(req.url, true).query;
    let places = [];

    let country = query.country || "";
    let region = query.region || "";
    let city = query.city || "";
    let county = query.county || "";


    //retrieve streets
    if (country != EMPTY_VALUE && region != EMPTY_VALUE && city != EMPTY_VALUE && county != EMPTY_VALUE) {
        placesRepo.findAllStreets(country, region, city, county, (err, result) => {
            if (err) throw err;
            else {
                places = result;
            }

        });
    } else if (country != EMPTY_VALUE && region != EMPTY_VALUE && city != EMPTY_VALUE) { // retrieve counties
        placesRepo.findAllCounties(country, region, city, (err, result) => {
            if (err) throw err;
            else {
                places = result;
            }
        });
    } else if (country != EMPTY_VALUE && region != EMPTY_VALUE) { // retrieve cities
        placesRepo.findAllCities(country, region, (err, result) => {
            if (err) throw err;
            else {
                places = result;
            }
        })

    } else if (country != EMPTY_VALUE) { // retrieve regions
        placesRepo.findAllRegions(country, (err, result) => {
            if (err) throw err;
            else {
                places = result;
            }
        });
    }

    res.status(200).json(places);
});

apiRouter.get('/places/:country', (req, res) => {
    let query = url.parse(req.url, true).query;

    let places = [];
    let country = req.params.country || "";
    let streetKeyword = query.streetKeyword || "";

    if (country != EMPTY_VALUE && streetKeyword != EMPTY_VALUE) {
        placesRepo.findAllStreetStartingWith(country,streetKeyword, (err, result) =>{
            if (err) throw err;
            else {
                places = result;
            }
        });
    }


    res.status(200).json(places);
});

/**
 * Loading seat up data data , pass data location in body `dataUrl`
 */
apiRouter.post('/places/setup', (req, res) => {
    // let query = url.parse(req.url, true).query;
    let dataUrl = req.body.dataUrl || 'https://raw.githubusercontent.com/CEITECHS/pango-configs/master/data.json';

    readFiles.readJson(dataUrl, "R", (err, data) => {
        if (err) throw err;
        else {
            console.log('Loaded data filed from : ' + dataUrl);
            let addresses = data.map(elem => new Address(elem[config.addressId],
                elem[config.street], elem[config.longitude], elem[config.latitude],
                elem[config.county], elem[config.city], elem[config.postcode], elem[config.region], elem[config.timezone],
                elem[config.country]
                )
            );
            console.log("Retrieved  " + addresses.length + " places");
            //console.log(JSON.parse(JSON.stringify(addresses)));
            placesRepo.setupWithAddresses(JSON.parse(JSON.stringify(addresses)), (err, result) => {
                if (err) throw err;
                else {
                    res.status(200).json({
                        placesUrl: dataUrl,
                        recordsCount: addresses.length,
                        loadedCount: result.inserted.length,
                        failedCount: result.failed.length
                    });
                }

            });

        }

    });


});

module.exports = apiRouter;