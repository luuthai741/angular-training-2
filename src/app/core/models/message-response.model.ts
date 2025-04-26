import {MessageType} from "../../shared/constant/message.type";

export interface MessageResponse {
    statusCode: number;
    timestamp: Date;
    body: string;
    objectResponse: any,
    messageType?: MessageType;
}

export class MessageResponseBuilder {
    private statusCode!: number;
    private timestamp!: Date;
    private body!: string;
    private messageType: MessageType;
    private objectResponse: MessageResponse;

    withStatusCode(statusCode: number): this {
        this.statusCode = statusCode;
        return this;
    }

    withTimestamp(timestamp: Date): this {
        this.timestamp = timestamp;
        return this;
    }

    withBody(body: string): this {
        this.body = body;
        return this;
    }

    withObjectResponse(objectResponse: any): this {
        this.objectResponse = objectResponse;
        return this;
    }

    setMessageType() {
        if (isError(this.statusCode)) {
            this.messageType = MessageType.ERROR;
        } else if (isSuccess(this.statusCode)) {
            this.messageType = MessageType.SUCCESS;
        }
    }

    build(): MessageResponse {
        this.setMessageType();
        return {
            statusCode: this.statusCode,
            timestamp: this.timestamp,
            body: this.body,
            messageType: this.messageType,
            objectResponse: this.objectResponse,
        }
    }
}

export function isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
}

export function isError(code: number): boolean {
    return code >= 400;
}