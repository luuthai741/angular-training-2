import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from "../../../environments/environment";

export class ApiInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const apiRequest = req.clone({url: `${environment.apiUrl}${req.url}`});
        return next.handle(apiRequest);
    }
}
