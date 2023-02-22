'use strict';

var IonicDiscover = {

    listen: function(success, failure) {
        return window.cordova.exec(success, failure, "IonicDiscover", "start");
    },

    stop: function(success, failure) {
        return window.cordova.exec(success, failure, "IonicDiscover", "stop");
    },

    getServices: function(success, failure) {
        return window.cordova.exec(success, failure, "IonicDiscover", "getServices");
    },
};

module.exports = IonicDiscover;