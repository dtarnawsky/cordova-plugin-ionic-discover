import { Services } from "./Services";
export declare class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    start(): void;
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop(): void;
    getServices(): Promise<Services>;
}
