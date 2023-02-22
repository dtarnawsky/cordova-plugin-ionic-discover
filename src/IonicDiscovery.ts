import { Services } from "./Services";

class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "start");
        });
    }

    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "stop");
        });
    }

    getServices(): Promise<Services> {
        return new Promise<Services>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

export { IonicDiscovery };