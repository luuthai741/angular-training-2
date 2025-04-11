import { Injectable } from '@angular/core';
import { SigninResponse } from '../model/signin-response.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(user: { token: string; username: string }) {
    console.log('Login successfully ' + user.username);
    window.localStorage.setItem('accessToken', user.token);
    window.localStorage.setItem('username', user.username);
  }
  removeToken() {
    window.localStorage.removeItem('accesToken');
    window.localStorage.removeItem('username');
  }
  getCurrentUser(): string | null {
    return window.localStorage.getItem('username');
  }
}
