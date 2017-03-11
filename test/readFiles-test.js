"use strict"
const assert = require('assert');
const readFiles = require('../lib/readFiles');

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
                    console.log(data);
                    assert.equal(data.length, 1 ,"size is supposed to be 1");
                    done();
                }
            })
        });
    });
});