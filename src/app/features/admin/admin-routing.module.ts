import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminProductListComponent} from "./components/product-list.component";
import {ProductFormComponent} from "./components/product-form.component";
import {AdminUserListComponent} from "./components/user-list.component";
import {UserFormComponent} from "./components/user-form.component";
import {RoleGuard} from "../../core/guards/role.guard";
import {CanDeActiveGuard} from "../../core/guards/can-deactive.guard";
import {RoleType} from "../../shared/constant/role.type";

const routes: Routes = [
    {
        path: 'products',
        component: AdminProductListComponent,
        canActivate: [RoleGuard],
        data: {
            roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
            title: 'Products',
        }
    },
    {
        path: 'products/create',
        component: ProductFormComponent,
        canActivate: [RoleGuard],
        canDeactivate: [CanDeActiveGuard],
        data: {
            title: 'Create Product',
            roles: [RoleType[RoleType.ADMIN]]
        }
    },
    {
        path: 'products/edit/:id',
        component: ProductFormComponent,
        canActivate: [RoleGuard],
        data: {
            title: 'Edit Product',
            roles: [RoleType[RoleType.ADMIN]]
        }
    },
    {
        path: 'users',
        component: AdminUserListComponent,
        canActivate: [RoleGuard],
        data: {
            title: 'Users',
            roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
        }
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        canDeactivate: [CanDeActiveGuard],
        data: {
            title: 'Create User',
            roles: [RoleType[RoleType.ADMIN]]
        }
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: {
            title: 'Edit User',
            roles: [RoleType[RoleType.ADMIN]]
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
