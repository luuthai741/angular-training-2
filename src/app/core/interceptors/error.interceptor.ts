import {HttpErrorResponse} from '@angular/common/http';
import {HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {HttpInterceptor} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageResponseBuilder} from "../models/message-response.model";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const message =
                    typeof error.error === 'string'
                        ? error.error
                        : error.error?.message || 'Unknown error occurred';
                return throwError(new MessageResponseBuilder()
                    .withStatusCode(error.status)
                    .withTimestamp(new Date())
                    .withBody(message)
                    .build());
            })
        );
    }
}
