///<reference path="references.ts" />

//Gets loaded by Content Script and runs in the context of the web page.
module AllowClipboard.Client {
    export class ClipboardClient {
        private _clientId: string;
        private _readCallbacks: { [operationId: string]: (success: boolean, data: string) => void };
        private _writeCallbacks: { [operationId: string]: (success: boolean) => void };

        constructor() {
            this._clientId = AllowClipboard.Common.Guid.newGuid();
            this._writeCallbacks = {};
            this._readCallbacks = {};

            window.addEventListener("message", event => {
                // We only accept messages from ourselves
                if (event.source != window) {
                    return;
                }
                var message = <AllowClipboard.Common.IAllowClipboardResponseMessage> event.data;
                if (message.type != "AllowClipboardResponse" || message.clientId != this._clientId) {
                    return;
                }

                switch (message.operation) {
                    case "Read":
                        var readMessage = <AllowClipboard.Common.AllowClipboardReadResponseMessage>message;
                        var readCallback = this._readCallbacks[readMessage.operationId];
                        if (readCallback) {
                            readCallback(readMessage.success, readMessage.data);
                            delete this._readCallbacks[readMessage.operationId];
                        }
                        break;
                    case "Write":
                        var writeMessage = <AllowClipboard.Common.AllowClipboardWriteResponseMessage>message;
                        var writeCallback = this._writeCallbacks[writeMessage.operationId];
                        if (writeCallback) {
                            writeCallback(writeMessage.success);
                            delete this._writeCallbacks[writeMessage.operationId];
                        }
                        break;
                    default:
                        console.log("Unknown AllowClipboard operation: " + message.operation);
                }
            }, false);
        }

        public clipboardRead(callback: (success: boolean, data: string) => void = () => {}) {
            var operationId = AllowClipboard.Common.Guid.newGuid();
            this._readCallbacks[operationId] = callback;
            var clipboardReadEvent = new AllowClipboard.Common.AllowClipboardReadMessage(this._clientId, operationId);
            window.postMessage(clipboardReadEvent, "*");
        }

        public clipboardWrite(data: string, callback: (success: boolean) => void = () => { }) {
            var operationId = AllowClipboard.Common.Guid.newGuid();
            this._writeCallbacks[operationId] = callback;
            var clipboardWriteEvent = new AllowClipboard.Common.AllowClipboardWriteMessage(this._clientId, operationId, data);
            window.postMessage(clipboardWriteEvent, "*");
        }
    }
}