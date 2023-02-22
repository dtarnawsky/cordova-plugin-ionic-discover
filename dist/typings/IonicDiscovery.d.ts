import { Services } from "./Services";
declare class IonicDiscoveryCL {
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
declare const IonicDiscovery: IonicDiscoveryCL;
export { IonicDiscovery };
