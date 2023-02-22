import { Services } from "./Services";

class IonicDiscoveryCL {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    listen(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "listen");
        });
    }

    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "stop");
        });
    }

    getServices(): Promise<Services> {
        return new Promise<Services>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

const IonicDiscovery = new IonicDiscoveryCL();

export { IonicDiscovery }
