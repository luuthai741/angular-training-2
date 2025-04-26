import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MessageType} from "../../constant/message.type";
import {FormHelper} from "../../utils/form-helper";
import {ControlValidator} from "../../../core/models/control-validator.model";
import {getMessageByKey} from "../../constant/message-mapping";
import {DialogType} from "../../constant/dialog.type";

@Component({
    selector: 'form-validation-message',
    template: `
        <div class="overlay" (click)="handleConfirm(false)" *ngIf="isShow" closeDialog
             (enterPressed)="handleConfirm(false)">
            <common-dialog class="confirm-container" [messageType]="messageType" [title]="'Invalid Form'"
                           [dialogType]="dialogType">
                <div *ngFor="let controlValidator of controlValidatorsAfterChecked | keyvalue">
                    <div>*
                        {{ message(controlValidator.value.invalidControlName, controlValidator.value.title) }}
                    </div>
                </div>
            </common-dialog>
        </div>
    `
})
export class FormValidationMessageComponent implements OnInit {
    @Output() confirm = new EventEmitter<boolean>();
    @Input() formGroup!: FormGroup;
    @Input() messageType = MessageType.ERROR;
    @Input() controlValidators: ControlValidator[];
    dialogType: DialogType = DialogType.NOTIFY;
    formHelper = FormHelper;
    controlValidatorsAfterChecked: Map<string, ControlValidator> = new Map<string, ControlValidator>();
    isShow = true;

    ngOnInit(): void {
        this.hasAnyError();
    }

    hasAnyError(): boolean {
        if (!this.controlValidators) {
            return false;
        }
        for (const controlValidator of this.controlValidators) {
            if (!this.formHelper.isInvalid(controlValidator.controlName, this.formGroup)) {
                this.controlValidatorsAfterChecked.delete(controlValidator.controlName);
                continue;
            }
            for (const validatorName of controlValidator.validatorNames) {
                const isInvalid = this.formHelper.getError(controlValidator.controlName, this.formGroup, validatorName);
                if (!isInvalid) {
                    continue;
                }
                controlValidator.invalidControlName = validatorName;
                this.controlValidatorsAfterChecked.set(controlValidator.controlName, controlValidator);
                break;
            }
        }
        return true;
    }

    message(messageKey: string, title: string = ""): string {
        let message = getMessageByKey(this.messageType, messageKey);
        if (messageKey == "required") {
            message = `${message} ${title}`;
        }
        return message;
    }

    handleConfirm(isConfirmed: boolean): void {
        this.isShow = false;
        this.confirm.emit(isConfirmed);
    }
}
