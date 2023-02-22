'use strict';

var IonicDiscover = {

    start: function() {
        return window.cordova.exec(null, null, "IonicDiscover", "start");
    },

    stop: function() {
        return window.cordova.exec(null, null, "IonicDiscover", "stop");
    },

    getServices: function(success, failure) {
        return window.cordova.exec(success, failure, "IonicDiscover", "getServices");
    },
};

module.exports = IonicDiscover;