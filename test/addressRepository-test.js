"use strict"

/**
 * @author Iddy Magohe 2017
 */

const assert = require('assert');
const readFiles = require('../lib/readFiles');
const Address = require('../app/model/address')
const config = require('../config'); // get config file
const placesRepo = require('../app/repository/addressRepository');

describe('Read file from Remote and save contents to db', () => {
    describe('#setupWithAddresses()', () => {
        it('should read and write to db  without error', (done) => {
            readFiles.readJson('https://raw.githubusercontent.com/CEITECHS/pango-configs/master/data.json', "R", (err, data) => {
                if (err) done(err)
                else {
                    let addresses = data.map(elem => new Address(elem[config.addressId],
                        elem[config.street], elem[config.longitude], elem[config.latitude],
                        elem[config.county], elem[config.city], elem[config.postcode], elem[config.region], elem[config.timezone],
                        elem[config.country]
                        )
                    );
                    //  console.log(JSON.parse(JSON.stringify(addresses)));
                    placesRepo.setupWithAddresses(JSON.parse(JSON.stringify(addresses)), (err, result) => {
                        if (err) done(err)
                        else {
                            assert.equal(result.failed.length, 0, "all records should've  been  saved successfully");
                            assert.equal(result.inserted.length, 100, "all 100 records should've  been  save successfully");
                            done();
                        }
                    })
                }
            })
        });
    });
});

describe('find all places saved in db', () => {
    describe('#findAll()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAll((err, result) => {
                if (err) done(err);
                else {
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});


describe('find all region by country  saved in db', () => {
    describe('#findAllRegions()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAllRegions('Tanzania', (err, result) => {
                if (err) done(err);
                else {
                    //console.log(result);
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});


describe('find all cities by country and region saved in db', () => {
    describe('#findAllCities()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAllCities('Tanzania', 'Arusha', (err, result) => {
                if (err) done(err);
                else {
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});

describe('find all counties by country and region  and city saved in db', () => {
    describe('#findAllCounties()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAllCounties('Tanzania', 'Arusha', 'Arumeru', (err, result) => {
                if (err) done(err);
                else {
                    // console.log(result);
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});

describe('find all streets in a county  by country and region  and city saved in db', () => {
    describe('#findAllStreets()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAllStreets('Tanzania', 'Arusha', 'Arumeru', 'Kikwe', (err, result) => {
                if (err) done(err);
                else {
                   // console.log(result);
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});

describe('find all streets in a country starting with keyword saved in db', () => {
    describe('#findAllStreetsStartingWith()', () => {
        it('should return some items without throwing any error', (done) => {
            placesRepo.findAllStreetStartingWith('Tanzania', 'ng', (err, result) => {
                if (err) done(err);
                else {
                   console.log(result);
                    assert(result.length > 0, 'length should be greater than zeno');
                    done();
                }
            });
        });
    });
});