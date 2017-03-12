"use strict"

const config = require('../../config')
const ForerunnerDB = require("forerunnerdb");
const fdb = new ForerunnerDB();
const db = fdb.db(config.placesDB);
const placesCollection = db.collection(config.placesCollection, {primaryKey: config.placesCollectionPrimaryKey});

module.exports = {
    /**
     *
     * @param addresses
     * @param callback
     * @returns {*}
     */
    setupWithAddresses: (addresses, callback) => {
        try {
            placesCollection.insert(addresses, result => {
                callback(null, result);
            });

        } catch (error) {
            return callback(error, null);
        }
    },
    /**
     *
     * @param callback
     * @returns {*}
     */
    findAll: callback => {
        try {
            let places = placesCollection.find({});
            callback(null, places);
        } catch (err) {
            return callback(err)
        }
    },

    /**
     *
     * @param country
     * @param callback
     * @returns {*}
     */
    findAllRegions: (country, callback) => {
        try {
            let places = placesCollection.find({
                _country: country,
                $distinct: {_region: 1}

            }, {
                _referenceId: 0,
                _region: 1,
                _country: 1,
                _timezone: 1
            });

            callback(null, places);

        } catch (err) {
            return callback(err)
        }
    },

    /**
     *
     * @param country
     * @param region
     * @param callback
     * @returns {*}
     */
    findAllCities: (country, region, callback) => {
        try {
            let places = placesCollection.find({
                $and: [
                    {
                        _country: country
                    },
                    {
                        _region: region
                    }
                ],
                $distinct: {_city: 1}

            }, {
                _referenceId: 0,
                _city: 1,
                _region: 1,
                _timezone: 1,
                _country: 1

            });

            callback(null, places);

        } catch (err) {
            return callback(err)
        }
    },

    /**
     *
     * @param country
     * @param region
     * @param city
     * @param callback
     * @returns {*}
     */
    findAllCounties: (country, region, city, callback) => {
        try {
            let places = placesCollection.find({
                $and: [
                    {
                        _country: country
                    },
                    {
                        _region: region
                    },
                    {
                        _city: city
                    }
                ],
                $distinct: {_county: 1}

            }, {
                _referenceId: 0,
                _county: 1,
                _postcode: 1,
                _city: 1,
                _region: 1,
                _timezone: 1,
                _country: 1

            });

            callback(null, places);

        } catch (err) {
            return callback(err)
        }
    },

    /**
     * finds all streets in a county /area
     *
     * @param country
     * @param region
     * @param city
     * @param county
     * @param callback
     * @returns {*}
     */
    findAllStreets: (country, region, city,county, callback) => {
        try {
            let places = placesCollection.find({
                $and: [
                    {
                        _country: country
                    },
                    {
                        _region: region
                    },
                    {
                        _city: city
                    },
                    {
                        _county: county
                    }
                ],
                $distinct: {_street: 1}

            }, {
                _referenceId: 0,
                _street: 1,
                _longitude: 1,
                _latitude:1,
                _county: 1,
                _postcode: 1,
                _city: 1,
                _region: 1,
                _timezone: 1,
                _country: 1
            });

            callback(null, places);

        } catch (err) {
            return callback(err)
        }
    },
    /**
     * find all streets in country starting with a case-insensitive street name
     * @param country
     * @param street
     * @param callback
     * @returns {*}
     */
    findAllStreetStartingWith: (country, street, callback) => {
        try {
            let streetKeyword = new RegExp('^' + street, 'i');
            let places = placesCollection.find({
                $and: [
                    {
                        _country: country
                    },
                    {
                        _street: streetKeyword
                    }
                ]

            }, {
                _referenceId: 0,
                _street: 1,
                _longitude: 1,
                _latitude:1,
                _county: 1,
                _postcode: 1,
                _city: 1,
                _region: 1,
                _timezone: 1,
                _country: 1
            });

            callback(null, places);

        } catch (err) {
            return callback(err)
        }
    },


}
