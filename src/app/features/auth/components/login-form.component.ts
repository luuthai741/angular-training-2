import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {MessageResponse} from "../../../core/models/message-response.model";
import {ControlValidator} from "../../../core/models/control-validator.model";
import {FormHelper} from "../../../shared/utils/form-helper";
import {DialogType} from "../../../shared/constant/dialog.type";
import {ROUTE} from "../../../shared/constant/public-url";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    ROUTE = ROUTE;
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    messageResponse: MessageResponse = null;
    dialogTitle: string;
    isDialogOpen: boolean = false;
    isSubmitted: boolean = false;
    controlValidators: ControlValidator[] = [];
    formHelper = FormHelper;
    authForm: NgForm;
    formGroup: FormGroup;
    dialogType = DialogType.NOTIFY;

    @ViewChildren('formField') formFields: QueryList<ElementRef>;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }

    onSubmit(authForm: NgForm) {
        if (!this.authForm) {
            this.authForm = authForm;
            this.isSubmitted = true;
            this.formGroup = authForm.control;
            this.formHelper.setControlValidators(this.formGroup, this.controlValidators);
        }
        if (authForm.invalid) {
            authForm.control.markAllAsTouched();
            this.isDialogOpen = true;
            return;
        }
        this.loading = LoadingStateType.LOADING;
        this.authService.signIn(authForm.value).subscribe({
            next: () => this.router.navigate([ROUTE.HOME]),
            error: (err) => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = err;
                this.dialogTitle = "Login failed";
            },
        });
    }

    closeDialog(value: boolean): void {
        this.isDialogOpen = false;
        if (this.formGroup) {
            this.formHelper.focusOnInvalidField(this.formFields, this.formGroup);
        }
    }

    closeResponseDialog(isConfirm: boolean): void {
        this.messageResponse = null;
    }
}
