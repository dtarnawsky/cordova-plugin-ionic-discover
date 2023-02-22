export class IonicDiscovery {
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
            cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}
//# sourceMappingURL=IonicDiscovery.js.map