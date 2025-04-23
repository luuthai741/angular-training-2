import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {MessageResponse} from "../../../core/models/message-response.model";
import {ControlValidator} from "../../../core/models/control-validator.model";
import {FormHelper} from "../../../shared/utils/form-helper";
import {DialogType} from "../../../shared/constant/dialog.type";

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    messageResponse: MessageResponse = null;
    controlValidators: ControlValidator[] = [];
    isDialogOpen: boolean = false;
    isSubmitted: boolean = false;
    authForm: NgForm;
    formGroup: FormGroup;
    formHelper = FormHelper;
    dialogType: DialogType = DialogType.NOTIFY;

    @ViewChildren('formField') formFields: QueryList<ElementRef>;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit(authForm: NgForm) {
        if (!this.authForm) {
            this.authForm = authForm;
            this.isSubmitted = true;
            this.formGroup = authForm.control;
            this.formHelper.setControlValidators(this.formGroup, this.controlValidators);
        }
        if (this.authForm.invalid) {
            authForm.control.markAllAsTouched();
            this.isDialogOpen = true;
            return;
        }
        this.loading = LoadingStateType.LOADING;
        this.authService.signUp(authForm.value).subscribe({
            next: (data) => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = data as MessageResponse;
            },
            error: err => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = err;
            }
        })
    }

    closeNotificationAndRedirect(isConfirm: boolean = false) {
        if (!isConfirm) {
            return;
        }
        this.router.navigate(['/login']);
    }

    closeDialog(value: boolean): void {
        this.isDialogOpen = false;
        if (this.formGroup) {
            this.formHelper.focusOnInvalidField(this.formFields, this.formGroup);
        }
    }
}
