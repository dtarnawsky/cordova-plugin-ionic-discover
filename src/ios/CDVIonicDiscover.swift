import Foundation


@objc(CDVIonicDiscover) public class CDVIonicDiscover : CDVPlugin {

    var service: IonicDiscover!
    var callbackID: String?

    public override func pluginInitialize() {
        service = IonicDiscover(namespace: "devapp")
    }

    public func watch(_ command: CDVInvokedUrlCommand?) {
        // unwatch previous connections
        unwatch(nil)

        callbackID = command?.callbackId
        service.start { self.emit() }
    }

    public func unwatch(_ command: CDVInvokedUrlCommand?) {
        service.close()
        if let id = self.callbackID {
            commandDelegate?.send(CDVPluginResult(status: CDVCommandStatus_OK), callbackId: id)
            callbackID = nil
        }
        if let c = command {
            commandDelegate?.send(CDVPluginResult(status: CDVCommandStatus_OK), callbackId: c.callbackId)
        }
    }

    private func emit() {
        guard let id = self.callbackID else {
            return
        }
        let message = generateMessage(service.getServices())
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message)
        pluginResult?.setKeepCallbackAs(true)
        self.commandDelegate?.send(pluginResult, callbackId: id)
    }

    private func generateMessage(_ services: [Service]) -> [String: Any] {
        let arrayOfServices = services.map { (s) -> [String: Any] in
            return s.toDictionary()
        }
        return ["services": arrayOfServices]
    }
}
