import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProducerService} from './service/product.service';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './component/product-list.component';
import {ProductComponent} from './component/product.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './component/product-details.component';
import {ProductFormComponent} from './admin-component/product-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from './component/loading.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from './interceptor/logging.interceptor';
import {ApiInterceptor} from './interceptor/api.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {LoginComponent} from './component/login.component';
import {UserService} from './service/user.service';
import {TokenService} from './service/token.service';
import {HeaderComponent} from './layout/header.component';
import {TruncatePipe} from "./pipe/truncate.pipe";
import {AdminModule} from "./admin.module";
import {ShareModule} from "./share.module";
import {UnauthorizedComponent} from "./component/unauthorized.component";
import {LoginGuard} from "./guard/login.guard";

const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: ':id', component: ProductDetailComponent},
    {path: 'admin', loadChildren: () => import('./admin.module').then(m => m.AdminModule)},
];

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailComponent,
        ProductFormComponent,
        LoadingComponent,
        LoginComponent,
        HeaderComponent,
        UnauthorizedComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        AdminModule,
        ShareModule,
        CommonModule
    ],
    providers: [
        ProducerService,
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
    exports: [RouterModule, TruncatePipe],
})
export class AppModule {
}
