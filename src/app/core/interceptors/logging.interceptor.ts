import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Call API to URL: ${req.url}`);
    return next.handle(req);
  }
}
