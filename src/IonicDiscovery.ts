import { Services } from "./Services";

export class IonicDiscovery {

    /**
     * Start listening for broadcast services
     * @returns void
     */
    public start(): void {
    }

    /**
     * Stop listening for broadcast services
     * @returns void
     */
    public stop(): void {
    }

    public getServices(): Promise<Services> {
        return new Promise<Services>((resolve, reject) => {
            cordova?.exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}    