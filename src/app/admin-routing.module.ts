import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminProductListComponent} from "./admin-component/product-list.component";
import {ProductFormComponent} from "./admin-component/product-form.component";
import {AdminUserListComponent} from "./admin-component/user-list.component";
import {UserFormComponent} from "./admin-component/user-form.component";
import {RoleGuard} from "./guard/role.guard";

const routes: Routes = [
    {
        path: 'products', component: AdminProductListComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin', 'User']
        }
    },
    {
        path: 'products/create', component: ProductFormComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin']
        }
    },
    {
        path: 'products/edit/:id', component: ProductFormComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin']
        }
    },
    {
        path: 'users', component: AdminUserListComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin','User']
        }
    },
    {
        path: 'users/create', component: UserFormComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin']
        }
    },
    {
        path: 'users/edit/:id', component: UserFormComponent, canActivate: [RoleGuard], data: {
            roles: ['Admin']
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
