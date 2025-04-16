import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './core/services/product.service';
import {ProductListComponent} from './features/common/components/product-list.component';
import {ProductComponent} from './features/common/components/product.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './features/common/components/product-details.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggingInterceptor} from './core/interceptors/logging.interceptor';
import {ApiInterceptor} from './core/interceptors/api.interceptor';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {UserService} from './core/services/user.service';
import {TokenService} from './core/services/token.service';
import {HeaderComponent} from './shared/components/header.component';
import {ShareModule} from "./shared/share.module";
import {UnauthorizedComponent} from "./shared/components/unauthorized.component";
import {LoginGuard} from "./core/guards/login.guard";
import {RoleGuard} from "./core/guards/role.guard";
import {RoleType} from "./shared/constant/role.type";
import {PageNotFoundComponent} from "./shared/components/page-not-found.component";
import {LoginFormComponent} from "./features/auth/components/login-form.component";

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent,
        canActivate: [RoleGuard],
        data: {
            title: 'Home',
            roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER], RoleType[RoleType.GUEST]],
        },
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        data: {
            title: 'Unauthorized'
        }
    },
    {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [LoginGuard],
        data: {
            title: 'Login'
        }
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        data: {
            title: 'Product'
        }
    },
    {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)},
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailComponent,
        LoginFormComponent,
        HeaderComponent,
        UnauthorizedComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ShareModule,
        FormsModule
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
