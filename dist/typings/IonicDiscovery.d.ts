import { Services } from "./Services";
export declare class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    listen(): Promise<void>;
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop(): Promise<void>;
    getServices(): Promise<Services>;
}
