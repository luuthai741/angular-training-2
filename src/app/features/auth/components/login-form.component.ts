import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {MessageResponse} from "../../../core/models/message-response.model";
import {getMessageResponse} from "../../../shared/utils/router-helper";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    messageResponse: MessageResponse = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.messageResponse = getMessageResponse(this.router);
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

    goToRegister(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.router.navigate(['/register']);
    }
}
