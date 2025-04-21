import {Component, Input} from "@angular/core";
import {MessageType} from "../constant/message.type";
import {ERROR_MESSAGES, SUCCESS_MESSAGES} from "../constant/message-mapping";

@Component({
    selector: "common-dialog",
    templateUrl: "./common-dialog.component.html",
    styleUrls: ["./common-dialog.component.css"],
})
export class CommonDialogComponent {
    @Input() messageType: MessageType = MessageType.ERROR;
    @Input() messageKey: string;
    @Input() title: string;
    showCloseButton: boolean = true;

    canShowCloseButton(): boolean {
        return this.messageType != MessageType.ERROR;
    }

    closeToast(){
        this.showCloseButton = false;
    }

    message(): string {
        switch (this.messageType) {
            case MessageType.ERROR:
                return ERROR_MESSAGES[this.messageKey];
            case MessageType.SUCCESS:
                return SUCCESS_MESSAGES[this.messageKey];
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
                return "text-warning";
            case MessageType.SUCCESS:
                return "text-success";
        }
    }
}