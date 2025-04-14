import {Injectable} from "@angular/core";
import {LoginRequest} from "../model/login-request.model";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "../model/user.model";
import {Observable, Observer} from "rxjs";
import {MessageResponseBuilder} from "../model/message-response.model";

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
                    .withBody("Invalid login credentials")
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