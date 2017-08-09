import Foundation


@objc(CDVIonicDiscover) public class CDVIonicDiscover : CDVPlugin  {

    var service : IonicDiscover?
    var callbackID: String?

    public override func pluginInitialize() {
        self.service = IonicDiscover(namespace: "devapp")
    }

    public func watch(_ command: CDVInvokedUrlCommand) {
        print("WATCH START!!")
        self.callbackID = command.callbackId
        self.service?.start { (service) in
            print("WATCH RESULT!!")
            let message = self.generateMessage(service.getServices())
            let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message)
            pluginResult?.setKeepCallbackAs(true)
            self.commandDelegate?.send(pluginResult, callbackId: self.callbackID)
        }

    }

    private func generateMessage(_ services: [Service]) -> [String: Any] {
        let s = services.map { (s) -> [String: Any] in
            return s.toDictionary()
        }
        return ["services": s]
    }

    public func unwatch(_ command: CDVInvokedUrlCommand) {
        self.service?.close()
        self.callbackID = nil
    }
}
