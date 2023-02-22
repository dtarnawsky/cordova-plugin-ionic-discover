class IonicDiscoveryCL {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    listen() {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "listen");
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
const IonicDiscovery = new IonicDiscoveryCL();
export * from './Service';
export * from './Services';
export { IonicDiscovery };
//# sourceMappingURL=index.js.map