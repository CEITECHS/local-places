"use strict"
const fs = require('fs');
const https = require('https');


module.exports = {

    /**
     * Returns json content from a remote or local file
     * @param filename
     * @param mode accepted values is 'R' for remote or local otherwise
     * @param callback
     */
    readJson: (filename, mode, callback) => {
        if (mode != "R") {
            let path = process.cwd();
            fs.readFile(path + filename, 'utf8', (err, data) => {
                let parsed;
                if (err)
                    return callback(err);
                try {
                    parsed = JSON.parse(data);
                } catch (err) {
                    return callback(err);
                }
                // no errors, propagate just the data
                callback(null, parsed);
            });

        } else {
            let parsed;
            https.get(filename).on('response', response => {
                let data = '';
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('end', () => {
                    try {
                        parsed = JSON.parse(data);
                    } catch (err) {
                        return callback(err);
                    }
                    callback(null, parsed);
                });
                response.on('error', err => {
                    return callback(err);
                });
            });
        }
    }

};