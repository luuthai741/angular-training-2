import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {isError, MessageResponse} from "../../core/models/message-response.model";
import {isSuccess} from "angular-in-memory-web-api";

@Component({
    selector: 'common-message-response',
    template: `
        <div *ngIf="messageResponse"
             [ngClass]="setClass()">
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
    setClass(): string {
        if (isSuccess(this.messageResponse.statusCode)) {
            return 'text-success';
        }else if (isError(this.messageResponse.statusCode)) {
            return 'text-danger';
        }
        return '';
    }
}
