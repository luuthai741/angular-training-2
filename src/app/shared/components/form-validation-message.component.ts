import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MessageType} from "../constant/message.type";
import {FormHelper} from "../utils/form-helper";
import {ControlValidator} from "../../core/models/control-validator.model";

@Component({
    selector: 'form-validation-message',
    template: `
        <div class="toast-container" *ngIf="hasAnyError()">
            <div *ngFor="let controlValidator of controlValidatorsAfterChecked | keyvalue">
                <common-dialog [messageKey]="controlValidator.value.currentValidator"
                               [messageType]="messageType"
                               [title]="controlValidator.value.title">
                </common-dialog>
            </div>
        </div>
    `
})
export class FormValidationMessageComponent implements OnInit {
    @Input() formGroup!: FormGroup;
    @Input() messageType = MessageType.ERROR;
    @Input() controlValidators: ControlValidator[];
    formHelper = FormHelper;
    controlValidatorsAfterChecked: Map<string, ControlValidator> = new Map<string, ControlValidator>();

    ngOnInit(): void {
    }

    hasAnyError(): boolean {
        if (!this.controlValidators){
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
                controlValidator.currentValidator = validatorName;
                this.controlValidatorsAfterChecked.set(controlValidator.controlName, controlValidator);
                break;
            }
        }
        return true;
    }
}
