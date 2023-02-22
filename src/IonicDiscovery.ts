import { Services } from "./Services";

export class IonicDiscovery {

    /**
     * Start listening for broadcast services
     * @returns void
     */
     public static start(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "start");
        });
    }

    /**
     * Stop listening for broadcast services
     * @returns void
     */
    public static stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "stop");
        });
    }

    public static getServices(): Promise<Services> {
        return new Promise<Services>((resolve, reject) => {
            window.cordova.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}    