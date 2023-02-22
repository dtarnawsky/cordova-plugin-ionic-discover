import { Services } from "./Services";

class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    static start(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "start");
        });
    }

    /**
     * Stop listening for broadcast services
     * @returns void
     */
    static stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "stop");
        });
    }

    static getServices(): Promise<Services> {
        return new Promise<Services>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}

export { IonicDiscovery };