import {Component, Input, Output, EventEmitter} from "@angular/core";
import {MessageType} from "../constant/message.type";
import {DialogType} from "../constant/dialog.type";

@Component({
    selector: "common-confirm",
    template: `
        <div class="overlay" (click)="handleConfirm(null)" *ngIf="isShow">
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
        </div>
    `
})
export class CommonConfirm {
    @Output() confirm = new EventEmitter<boolean>();
    @Input() title: string;
    @Input() messageKey!: string;
    @Input() messageType: MessageType = MessageType.WARNING;
    @Input() dialogType: DialogType = DialogType.CONFIRM;
    isShow: boolean = true;

    handleConfirm(isConfirmed: boolean | null): void {
        if (!isConfirmed && this.messageType === MessageType.SUCCESS) {
            this.confirm.emit(true);
            return;
        }
        this.isShow = false;
        this.confirm.emit(isConfirmed);
    }
}