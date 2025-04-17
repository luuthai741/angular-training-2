import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductService} from './shared/services/product.service';
import {ProductListComponent} from './features/home/components/product/product-list.component';
import {ProductComponent} from './features/home/components/product/product.component';
import {ProductDetailComponent} from './features/home/components/product/product-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoggingInterceptor} from './core/interceptors/logging.interceptor';
import {ApiInterceptor} from './core/interceptors/api.interceptor';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {UserService} from './shared/services/user.service';
import {TokenService} from './shared/services/token.service';
import {HeaderComponent} from './shared/components/header.component';
import {ShareModule} from "./shared/share.module";
import {UnauthorizedComponent} from "./shared/components/unauthorized.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found.component";
import {LoginFormComponent} from "./features/auth/components/login-form.component";
import {RegisterFormComponent} from "./features/auth/components/register-form.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailComponent,
        LoginFormComponent,
        HeaderComponent,
        UnauthorizedComponent,
        PageNotFoundComponent,
        RegisterFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ShareModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ProductService,
        UserService,
        TokenService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
