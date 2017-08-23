import Foundation

public struct Service {

    var id: String
    var lastTimeStamp: TimeInterval
    var name: String
    var hostname: String
    var address: String
    var port: Int

    public static func ==(lhs: Service, rhs: Service) -> Bool {
        return lhs.id == rhs.id && lhs.lastTimeStamp == rhs.lastTimeStamp;
    }

    public func toDictionary() -> [String: Any] {
        return [
            "id": self.id,
            "name": self.name,
            "hostname": self.hostname,
            "address": self.address,
            "port": self.port
        ]
    }
}

public class IonicDiscover : NSObject, GCDAsyncUdpSocketDelegate {

    private static let PORT: UInt16 = 41234
    private static let PREFIX = "ION_DP"

    var namespace: String
    var socket: GCDAsyncUdpSocket?
    var services = [String: Service]()
    var servicesEmitted = [String: Service]()
    var timer: Timer?
    var didChange: ((IonicDiscover) -> Void)?

    init(namespace: String) {
        self.namespace = namespace
    }

    public func isRunning() -> Bool {
        return self.socket != nil
    }

    public func start(didChange: @escaping ((IonicDiscover)->Void)) {
        if self.isRunning() {
            return
        }

        let socket = GCDAsyncUdpSocket(delegate: self, delegateQueue: DispatchQueue.main)

        // -- Enable IP4 only
        socket.setIPv6Enabled(false)
        socket.setIPv4Enabled(true)

        do {
            try socket.bind(toPort: IonicDiscover.PORT)
            try socket.enableBroadcast(true)
            try socket.beginReceiving()
            self.socket = socket
            self.didChange = didChange
            self.timer = Timer.scheduledTimer(timeInterval: 1, target: self, selector:#selector(IonicDiscover.gc), userInfo: nil, repeats: true);

        } catch _ as NSError {
            print("Issue with setting up listener")
            socket.close()
        }
    }

    public func getServices() -> [Service] {
        return Array(self.services.values)
    }

    func gc() {
        let expired = Date().timeIntervalSince1970 - 8
        for (id, service) in self.services {
            if service.lastTimeStamp < expired {
                self.services.removeValue(forKey: id)
            }
        }
        self.emit();
    }

    private func emit() {
        self.didChange?(self)
    }

    public func udpSocket(_ sock: GCDAsyncUdpSocket, didReceive data: Data, fromAddress address: Data, withFilterContext filterContext: Any?) {
        let prefix = String(bytes: data.subdata(in: 0..<IonicDiscover.PREFIX.lengthOfBytes(using: String.Encoding.ascii)), encoding: String.Encoding.ascii);
        guard prefix == IonicDiscover.PREFIX else {
            return
        }

        let content = data.subdata(in: 6..<data.count)

        guard
            let json = try? JSONSerialization.jsonObject(with: content, options: []),
            let dictionary = json as? [String:Any],
            let id = dictionary["id"] as? String,
            let name = dictionary["name"] as? String,
            let hostname = dictionary["host"] as? String,
            let address = dictionary["ip"] as? String,
            let port = dictionary["port"] as? Int
            else { return }

        let now = Date().timeIntervalSince1970
        self.services[id] = Service(id: id, lastTimeStamp: now, name: name, hostname: hostname, address: address, port: port);
        self.gc();
    }

    public func close() {
        self.socket?.close()
        self.timer?.invalidate()
        self.didChange = nil
        self.socket = nil
        self.timer = nil
    }
}
