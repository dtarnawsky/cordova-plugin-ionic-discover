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
            cordova === null || cordova === void 0 ? void 0 : cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

export { IonicDiscovery };
//# sourceMappingURL=index.js.map
