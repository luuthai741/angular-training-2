import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MessageResponse} from "../model/message-response.model";

@Component({
    selector: 'app-message-response',
    template: `
        <div *ngIf="messageResponse"
             [ngClass]="{
                'text-success': isSuccess(messageResponse.statusCode),
                'text-danger': isError(messageResponse.statusCode)
            }">
            {{ messageResponse.body }}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageResponseComponent {
    private _messageResponse: MessageResponse = null;

    @Input()
    set messageResponse(value: MessageResponse) {
        this._messageResponse = value;
    }

    get messageResponse(): MessageResponse {
        return this._messageResponse;
    }

    isSuccess(code: number): boolean {
        return code >= 200 && code < 300;
    }

    isError(code: number): boolean {
        return code >= 400;
    }
}
