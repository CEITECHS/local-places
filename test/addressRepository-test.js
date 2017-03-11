"use strict"
const assert = require('assert');
const readFiles = require('../lib/readFiles');
const Address = require('../app/model/address')
const config = require('../config'); // get config file
const placesRepo = require('../app/repository/addressRepository');

describe('Read file from Remote and save contents to db', () => {
    describe('#setupWithAddresses)', () => {
        it('should read and write to db  without error', (done) => {
            readFiles.readJson('https://raw.githubusercontent.com/CEITECHS/pango-configs/master/data.json',"R", (err, data) => {
                if (err) done(err)
                else {
                    let addresses = data.map(elem => new Address(elem[config.addressId],
                        elem[config.street], elem[config.longitude], elem[config.latitude],
                        elem[config.county],elem[config.city], elem[config.postalcode], elem[config.region], elem[config.timezone],
                        elem[config.country]
                        )
                    );
                    //  console.log(JSON.parse(JSON.stringify(addresses)));
                    placesRepo.setupWithAddresses(JSON.parse(JSON.stringify(addresses)), (err, result) => {
                        if (err) done(err)
                        else{
                            assert.equal(result.failed.length, 0 , "all records should've  been  save successfully");
                            assert.equal(result.inserted.length, 100 , "all 100 records should've  been  save successfully");
                            done();
                        }
                    })
                }
            })
        });
    });
});