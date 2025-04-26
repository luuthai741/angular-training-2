import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./features/home/components/product/product-list.component";
import {UnauthorizedComponent} from "./shared/components/unauthorized.component";
import {LoginFormComponent} from "./features/auth/components/login-form.component";
import {LoginGuard} from "./core/guards/login.guard";
import {ProductDetailComponent} from "./features/home/components/product/product-details.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found.component";
import {RoleGuard} from "./core/guards/role.guard";
import {RoleType} from "./shared/constant/role.type";
import {RegisterFormComponent} from "./features/auth/components/register-form.component";
import {UserFormComponent} from "./features/admin/components/user/user-form.component";
import {UserRoleGuard} from "./core/guards/user-role.guard";

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
        path: 'register',
        component: RegisterFormComponent,
        canActivate: [LoginGuard],
        data: {
            title: 'Register'
        }
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        data: {
            title: 'Product Page'
        }
    },
    {
        path: 'users/:id',
        component: UserFormComponent,
        canActivate: [UserRoleGuard],
        data: {
            title: 'User Profile'
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
