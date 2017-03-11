"use strict"
const assert = require('assert');
const readFiles = require('../lib/readFiles');
const Address = require('../app/model/address')
const config = require('../config'); // get config file

describe('ReadFile from Local', () => {
    describe('#readJson()', () => {
        it('should read without error', (done) => {
            readFiles.readJson('/test/data.json',"L", (err, data) => {
                if (err) done(err)
                else {
                    console.log(data);
                    assert.equal(data.length, 1 ,"size is supposed to be 1");
                    done();
                }
            })
        });
    });
});


describe('ReadFile from Remote', () => {
    describe('#readJson()', () => {
        it('should read without error', (done) => {
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
                    assert.equal(data.length, 100 ,"size is supposed to be 100");
                    done();
                }
            })
        });
    });
});