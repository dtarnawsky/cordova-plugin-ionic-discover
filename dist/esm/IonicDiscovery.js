export class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    start() {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "start");
        });
    }
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop() {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "stop");
        });
    }
    getServices() {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}
//# sourceMappingURL=IonicDiscovery.js.map