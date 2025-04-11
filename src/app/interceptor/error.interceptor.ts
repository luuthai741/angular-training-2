import { HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        const err = {
          status: error.status,
          raw: error,
          message: message,
        };
        return throwError(err);
      })
    );
  }
}
