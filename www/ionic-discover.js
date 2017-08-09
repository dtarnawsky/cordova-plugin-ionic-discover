'use strict';
var exec = require('cordova/exec');

var IonicDiscover = {

    watch : function(success, failure) {
        return exec(success, failure, "IonicDiscover", "watch");
    },

    unwatch : function(success, failure) {
        return exec(success, failure, "IonicDiscover", "unwatch");
    },

};

module.exports = IonicDiscover;