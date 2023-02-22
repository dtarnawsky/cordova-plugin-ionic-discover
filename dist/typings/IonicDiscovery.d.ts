import { Services } from "./Services";
declare class IonicDiscovery {
    /**
     * Start listening for broadcast services
     * @returns void
     */
    static start(): Promise<void>;
    /**
     * Stop listening for broadcast services
     * @returns void
     */
    static stop(): Promise<void>;
    static getServices(): Promise<Services>;
}
export { IonicDiscovery };
