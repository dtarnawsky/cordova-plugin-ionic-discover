import { Services } from "./Services";
import { exec } from 'cordova';

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
            exec(resolve, reject, "IonicDiscover", "getServices");
        });
    }
}    