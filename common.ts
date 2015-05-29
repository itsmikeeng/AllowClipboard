module AllowClipboard.Common {
    export interface IAllowClipboardMessage {
        type: string;
        clientId: string;
        operation: string;
        operationId: string;
    }

    export interface IAllowClipboardResponseMessage extends IAllowClipboardMessage {
        success: boolean;
    }

    /* Abstract class do not use */
    export class AllowClipboardMessage implements IAllowClipboardMessage {
        type: string;
        clientId: string;
        operation: string;
        operationId: string;

        constructor(operation: string, clientId: string, operationId: string) {
            this.type = "AllowClipboard";
            this.operation = operation;
            this.clientId = clientId;
            this.operationId = operationId;
        }
    }

    export class AllowClipboardReadMessage extends AllowClipboardMessage {
        constructor(clientId: string, operationId: string) {
            super("Read", clientId, operationId);
        }
    }

    export class AllowClipboardWriteMessage extends AllowClipboardMessage {
        data: string;

        constructor(clientId: string, operationId: string, data: string) {
            super("Write", clientId, operationId);
            this.data = data;
        }
    }
    
    /* Abstract class do not use */
    export class AllowClipboardMessageResponse implements IAllowClipboardResponseMessage {
        type: string;
        clientId: string;
        operation: string;
        operationId: string;
        success: boolean;

        constructor(operation: string, clientId: string, operationId: string, success: boolean) {
            this.type = "AllowClipboardResponse";
            this.operation = operation;
            this.clientId = clientId;
            this.operationId = operationId;
            this.success = success;
        }
    }

    export class AllowClipboardReadResponseMessage extends AllowClipboardMessageResponse {
        data: string;

        constructor(clientId: string, operationId: string, success: boolean, data: string) {
            super("Read", clientId, operationId, success);
            this.data = data;
        }
    }

    export class AllowClipboardWriteResponseMessage extends AllowClipboardMessageResponse {
        constructor(clientId: string, operationId: string, success: boolean) {
            super("Write", clientId, operationId, success);
        }
    }

    export class Guid {
        private static _s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        public static newGuid(): string {
            return Guid._s4() + Guid._s4() + '-' + Guid._s4() + '-' + Guid._s4() + '-' +
                Guid._s4() + '-' + Guid._s4() + Guid._s4() + Guid._s4();
        }
    }
}