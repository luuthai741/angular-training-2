import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingState} from '../constant/loading-state.model';
import {Router} from '@angular/router';
import {FormHelper} from "../common/form-helper";
import {AuthService} from "../service/auth.service";
import {MessageResponse} from "../model/message-response.model";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loading: LoadingState = LoadingState.NOT_LOADED;
    messageResponse: MessageResponse = null;
    formHelper = FormHelper;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit(authForm: NgForm) {
        if (authForm.invalid) {
            return;
        }
        this.loading = LoadingState.LOADING;
        this.authService.signIn(authForm.value).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                this.loading = LoadingState.LOADED;
                this.messageResponse = err;
            },
        });
    }
}
