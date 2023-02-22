/*! Ionic Discovery: https://ionicframework.com */
import { exec } from 'cordova';

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
            exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

export { IonicDiscovery };
//# sourceMappingURL=index.js.map
