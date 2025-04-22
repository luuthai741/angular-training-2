import {Component, Input, Output, EventEmitter} from "@angular/core";
import {MessageType} from "../constant/message.type";
import {DialogType} from "../constant/dialog.type";

@Component({
    selector: "common-confirm",
    template: `
        <div class="overlay" (click)="handleConfirm(false)"></div>
        <div class="confirm-container">
            <common-dialog
                    (confirm)="handleConfirm($event)"
                    [messageKey]="messageKey"
                    [messageType]="messageType"
                    [title]="title"
                    [dialogType]="dialogType"
            >
            </common-dialog>
        </div>
    `
})
export class CommonConfirm {
    @Output() confirm = new EventEmitter<boolean>();
    @Input() title: string;
    @Input() messageKey!: string;
    @Input() messageType: MessageType = MessageType.WARNING;
    dialogType = DialogType.CONFIRM;

    handleConfirm(isConfirmed: boolean): void {
        this.confirm.emit(isConfirmed);
    }
}