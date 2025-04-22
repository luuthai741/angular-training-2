import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MessageType} from "../constant/message.type";
import {ERROR_MESSAGES, SUCCESS_MESSAGES, WARNING_MESSAGES} from "../constant/message-mapping";
import {DialogType} from "../constant/dialog.type";

@Component({
    selector: "common-dialog",
    templateUrl: "./common-dialog.component.html",
    styleUrls: ["./common-dialog.component.css"],
})
export class CommonDialogComponent {
    @Input() messageType: MessageType = MessageType.ERROR;
    @Input() messageKey: string;
    @Input() title: string;
    @Input() showCloseButton: boolean = true;
    @Input() dialogType: DialogType = DialogType.TOAST;
    @Output() confirm = new EventEmitter<boolean>();

    canShowCloseButton(): boolean {
        return this.messageType != MessageType.ERROR;
    }

    isConfirmDialog(): boolean {
        return this.dialogType === DialogType.CONFIRM;
    }

    closeToast() {
        this.confirm.emit(false);
        this.showCloseButton = false;
    }

    message(): string {
        switch (this.messageType) {
            case MessageType.ERROR:
                return ERROR_MESSAGES[this.messageKey];
            case MessageType.SUCCESS:
                return SUCCESS_MESSAGES[this.messageKey];
            case MessageType.WARNING:
                return WARNING_MESSAGES[this.messageKey];
            default:
                return "";
        }
    }

    setClass(): string {
        switch (this.messageType) {
            case MessageType.ERROR:
                return "text-danger";
            case MessageType.INFO:
                return "text-info";
            case MessageType.WARNING:
                return "text-dark";
            case MessageType.SUCCESS:
                return "text-success";
        }
    }
}