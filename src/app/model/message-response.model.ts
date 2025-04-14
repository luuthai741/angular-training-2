export interface MessageResponse {
    statusCode: number;
    timestamp: Date;
    body: string;
}

export class MessageResponseBuilder {
    private _statusCode!: number;
    private _timestamp!: Date;
    private _body!: string;

    withStatusCode(statusCode: number): this {
        this._statusCode = statusCode;
        return this;
    }

    withTimestamp(timestamp: Date): this {
        this._timestamp = timestamp;
        return this;
    }

    withBody(body: string): this {
        this._body = body;
        return this;
    }

    build(): MessageResponse {
        return {
            statusCode: this._statusCode,
            timestamp: this._timestamp,
            body: this._body,
        };
    }
}