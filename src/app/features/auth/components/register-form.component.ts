import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {MessageResponse} from "../../../core/models/message-response.model";
import {setMessageType} from "../../../shared/utils/router-helper";

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    messageResponse: MessageResponse = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit(authForm: NgForm) {
        if (authForm.invalid) {
            return;
        }
        this.loading = LoadingStateType.LOADING;
        this.authService.signUp(authForm.value).subscribe({
            next: (data) => {
                this.loading = LoadingStateType.LOADED;
                this.router.navigate(['/login'], {
                    state: data
                });
            },
            error: err => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = err;
                setMessageType(this.messageResponse);
            }
        })
    }
}
