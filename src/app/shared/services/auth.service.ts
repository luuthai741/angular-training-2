import {Injectable} from "@angular/core";
import {LoginRequest} from "../../core/models/login-request.model";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {catchError} from 'rxjs/operators';

import {UserService} from "./user.service";
import {User} from "../../core/models/user.model";
import {Observable, Observer} from "rxjs";
import {MessageResponse, MessageResponseBuilder} from "../../core/models/message-response.model";
import {RegisterRequest} from "../../core/models/register-request.model";
import {RoleType} from "../constant/role.type";
import {GenderType} from "../constant/gender.type";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        private tokenService: TokenService,
        private userService: UserService,
        private router: Router,
    ) {
    }

    signIn(loginRequest: LoginRequest) {
        return new Observable((observer: Observer<any>) => {
            const users = this.userService.getUsers();
            const user = users.find(user => user.username === loginRequest.username && user.password === loginRequest.password);
            if (!user) {
                observer.error(new MessageResponseBuilder()
                    .withBody("loginFailed")
                    .withStatusCode(400)
                    .withTimestamp(new Date())
                    .build());
                return;
            }
            this.tokenService.saveToken(user);
            observer.next(user);
            observer.complete();
        })
    }

    signUp(registerRequest: RegisterRequest): Observable<MessageResponse> {
        return new Observable((observer: Observer<any>) => {
            let isPassed = true;
            let errorMessage = '';
            if (registerRequest.password !== registerRequest.confirmPassword) {
                isPassed = false;
                errorMessage = "confirmPassword";
            }
            if (this.userService.isUsernameExists(registerRequest.username)) {
                isPassed = false;
                errorMessage = "usernameExisting";
            }
            if (!isPassed) {
                observer.error(new MessageResponseBuilder()
                    .withStatusCode(400)
                    .withBody(errorMessage)
                    .withTimestamp(new Date())
                    .build()
                );
                return;
            }
            const role = RoleType.GUEST + "";
            const newUser: User = {
                id: 1,
                username: registerRequest.username,
                password: registerRequest.password,
                fullName: '',
                age: 1,
                gender: '',
                role: role
            };
            this.userService.saveUser(newUser).pipe(
                catchError(err => {
                    observer.error(err);
                    return [];
                })).subscribe({
                next: (data) => {
                    observer.next(new MessageResponseBuilder()
                        .withBody("signUpSuccess")
                        .withTimestamp(new Date())
                        .withStatusCode(201)
                        .build()
                    );
                    observer.complete();
                },
                error: err => {
                    observer.error(err);
                }
            })
        })
    }

    logout() {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
    }

    getCurrentUser(): User {
        if (!localStorage.getItem('username')) {
            return null;
        }
        const username = localStorage.getItem('username');
        return this.userService.getUserByUsername(username);
    }
}