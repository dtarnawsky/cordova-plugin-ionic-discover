/*! Ionic Discovery: https://ionicframework.com */
class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    start() {
    }
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop() {
    }
    getServices() {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

export { IonicDiscovery };
//# sourceMappingURL=index.js.map
