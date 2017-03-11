"use strict"
const config = require('../../config')
const ForerunnerDB = require("forerunnerdb");
const fdb = new ForerunnerDB();
const db = fdb.db(config.placesDB);
const collection = db.collection(config.placesCollection, {primaryKey: config.placesCollectionPrimaryKey});

module.exports = {
    setupWithAddresses : (addresses, callback) => {
        try {
            collection.insert(addresses, result =>{
                callback(null, result);
            });

        }catch (error){
            return callback(error, null);
        }
    }
}
