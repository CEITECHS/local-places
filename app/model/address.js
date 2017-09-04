"use strict"
/**
 * @author Iddy Magohe 2017
 */

 class Address {
    constructor(id, street, longitude, latitude, county, city,  postalcode, region, timezone, country){
        this._referenceId = id;
        this._street = street;
        this._longitude = longitude;
        this._latitude = latitude;
        this._county = county;
        this._city = city;
        this._postcode = postalcode;
        this._region = region;
        this._timezone = timezone;
        this._country = country;

    }

     get referenceId() {
         return this._referenceId;
     }

     set referenceId(value) {
         this.referenceId = value;
     }

     get street() {
         return this._street;
     }

     set street(value) {
         this._street = value;
     }

     get longitude() {
         return this._longitude;
     }

     set longitude(value) {
         this._longitude = value;
     }

     get latitude() {
         return this._latitude;
     }

     set latitude(value) {
         this._latitude = value;
     }

     get county() {
         return this._county;
     }

     set county(value) {
         this._county = value;
     }

     get city() {
         return this._city;
     }

     set city(value) {
         this._city = value;
     }

     get postalcode() {
         return this._postcode;
     }

     set postalcode(value) {
         this._postcode = value;
     }

     get region() {
         return this._region;
     }

     set region(value) {
         this._region = value;
     }

     get timezone() {
         return this._timezone;
     }

     set timezone(value) {
         this._timezone = value;
     }

     get country() {
         return this._country;
     }

     set country(value) {
         this._country = value;
     }
 }

module.exports = Address;