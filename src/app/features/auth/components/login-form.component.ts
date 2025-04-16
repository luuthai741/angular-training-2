import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {Router} from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";
import {MessageResponse} from "../../../core/models/message-response.model";

@Component({
    selector: 'common-login-form',
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
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
        this.authService.signIn(authForm.value).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = err;
            },
        });
    }
}
