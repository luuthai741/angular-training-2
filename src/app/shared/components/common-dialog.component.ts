import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MessageType} from "../constant/message.type";
import {DialogType} from "../constant/dialog.type";
import {getMessageByKey} from "../constant/message-mapping";

@Component({
    selector: "common-dialog",
    templateUrl: "./common-dialog.component.html",
    styleUrls: ["./common-dialog.component.css"],
})
export class CommonDialogComponent {
    @Input() messageType: MessageType = MessageType.ERROR;
    @Input() messageKey: string;
    @Input() title: string;
    @Input() dialogType: DialogType = DialogType.CONFIRM;
    @Output() confirm = new EventEmitter<boolean>();
    baseDialog = DialogType;

    closeToast() {
        this.confirm.emit(false);
    }

    get message(): string {
        return getMessageByKey(this.messageType, this.messageKey);
    }

    setTextClass(): string {
        switch (this.messageType) {
            case MessageType.ERROR:
            case MessageType.WARNING:
                return "text-danger";
            case MessageType.INFO:
                return "text-info";
            case MessageType.SUCCESS:
                return "text-success";
        }
    }

    setButtonClass(): string {
        switch (this.messageType) {
            case MessageType.ERROR:
            case MessageType.WARNING:
                return "btn-danger";
            case MessageType.INFO:
                return "btn-info";
            case MessageType.SUCCESS:
                return "btn-success";
        }
    }
}