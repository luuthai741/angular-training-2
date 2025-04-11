import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SigninResponse } from '../model/signin-response.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {LoginRequest} from "../model/login-request.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  signIn(loginRequest: LoginRequest): Observable<SigninResponse> {
    return this.httpClient
      .post<SigninResponse>('/auth/login', loginRequest)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken({
            username: loginRequest.username,
            token: response.token,
          });
        })
      );
  }
}
