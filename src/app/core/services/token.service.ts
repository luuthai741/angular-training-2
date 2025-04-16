import {Injectable} from '@angular/core';

import {User} from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    saveToken(user: User) {
        window.localStorage.setItem('username', user.username);
    }

    removeToken() {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('username');
    }

    getCurrentUser(): string | null {
        return window.localStorage.getItem('username');
    }
}
