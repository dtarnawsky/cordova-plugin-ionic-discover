'use strict';
import { exec } from 'cordova';

var IonicDiscover = {

    start: function() {
        return exec(null, null, "IonicDiscover", "start");
    },

    stop: function() {
        return exec(null, null, "IonicDiscover", "stop");
    },

    getServices: function(success, failure) {
        return exec(success, failure, "IonicDiscover", "getServices");
    },
};

module.exports = IonicDiscover;