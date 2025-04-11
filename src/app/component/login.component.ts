import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingState} from '../constant/loading-state.model';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormHelper} from "../common/form-helper";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authForm: FormGroup;
  loading: LoadingState = LoadingState.NOT_LOADED;
  errorMessage:string;
  formHelper = FormHelper;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }
    this.loading = LoadingState.LOADING;
    this.userService.signIn(this.authForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading = LoadingState.LOADED;
        this.errorMessage =  err.message;
        console.log(this.errorMessage);
      },
    });
  }
}
