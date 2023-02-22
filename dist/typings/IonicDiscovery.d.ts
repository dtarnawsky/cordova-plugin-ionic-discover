import { Services } from "./Services";
declare class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    start(): Promise<void>;
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    stop(): Promise<void>;
    getServices(): Promise<Services>;
}
export { IonicDiscovery };
