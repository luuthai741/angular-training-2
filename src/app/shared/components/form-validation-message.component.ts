import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MessageType} from "../constant/message.type";
import {FormHelper} from "../utils/form-helper";

@Component({
    selector: 'form-validation-message',
    template: `
        <ng-container *ngIf="hasError('required')">
            <common-dialog [messageKey]="'required'" [messageType]="messageType" [title]="title"></common-dialog>
        </ng-container>
        <ng-container *ngIf="errorKey && hasError(errorKey)">
            <common-dialog [messageKey]="errorKey" [messageType]="messageType" [title]="title"></common-dialog>
        </ng-container>
    `
})
export class FormValidationMessageComponent {
    @Input() formGroup!: FormGroup;
    @Input() controlName!: string;
    @Input() title!: string;
    @Input() errorKey?: string;
    @Input() messageType = MessageType.ERROR;
    formHelper = FormHelper;

    hasError(errorKey: string): boolean {
        return this.formHelper.getError(this.controlName, this.formGroup, errorKey);
    }
}
