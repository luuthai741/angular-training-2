import {MessageType} from "../../shared/constant/message.type";
import {isError, isSuccess} from "../../shared/constant/message-mapping";

export interface MessageResponse {
    statusCode: number;
    timestamp: Date;
    body: string;
    messageType?: MessageType;
}

export class MessageResponseBuilder {
    private statusCode!: number;
    private timestamp!: Date;
    private body!: string;
    private messageType: MessageType;

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

    setMessageType(): this {
        if (isError(this.statusCode)) {
            this.messageType = MessageType.ERROR;
        } else if (isSuccess(this.statusCode)) {
            this.messageType = MessageType.SUCCESS;
        }
        return this;
    }

    build(): MessageResponse {
        this.setMessageType();
        return {
            statusCode: this.statusCode,
            timestamp: this.timestamp,
            body: this.body,
            messageType: this.messageType,
        }
    }
}