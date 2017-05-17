///<reference path="common.ts" />

//Runs in the context of the chrome extension background.
module AllowClipboard {
    var clipboardBuffer = document.createElement("textarea");
    document.body.appendChild(clipboardBuffer);

    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

            var message = <AllowClipboard.Common.IAllowClipboardMessage> request;
            if (message.type === "AllowClipboard") {
                clipboardBuffer.value = '';
                clipboardBuffer.focus();
                switch (message.operation) {
                    case "Read":
                        var readMessage = <AllowClipboard.Common.AllowClipboardReadMessage> message;
                        if (document.execCommand("paste")) {
                            sendResponse(new AllowClipboard.Common.AllowClipboardReadResponseMessage(readMessage.clientId, readMessage.operationId, true, clipboardBuffer.value));
                        } else {
                            sendResponse(new AllowClipboard.Common.AllowClipboardReadResponseMessage(readMessage.clientId, readMessage.operationId, false, null));
                        }
                        break;
                    case "Write":
                        var writeMessage = <AllowClipboard.Common.AllowClipboardWriteMessage> message;
                        clipboardBuffer.value = writeMessage.data;
                        clipboardBuffer.select();
                        if (document.execCommand("copy")) {
                            sendResponse(new AllowClipboard.Common.AllowClipboardWriteResponseMessage(writeMessage.clientId, writeMessage.operationId, true));
                        } else {
                            sendResponse(new AllowClipboard.Common.AllowClipboardWriteResponseMessage(writeMessage.clientId, writeMessage.operationId, false));
                        }
                        break;
                }
            }
        });
}