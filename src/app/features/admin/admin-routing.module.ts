import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminProductListComponent} from "./components/product/admin-product-list.component";
import {ProductFormComponent} from "./components/product/product-form.component";
import {AdminUserListComponent} from "./components/user/user-list.component";
import {UserFormComponent} from "./components/user/user-form.component";
import {RoleGuard} from "../../core/guards/role.guard";
import {RoleType} from "../../shared/constant/role.type";
import {UserDetailsComponent} from "./components/user/user-details.component";
import {AdminProductDetailsComponent} from "./components/product/admin-product-details.component";

const routes: Routes = [
    {
        path: 'products',
        component: AdminProductListComponent,
        canActivate: [RoleGuard],
        data: {
            roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
            title: 'Products',
        },
        children: [
            {
                path: 'create',
                component: ProductFormComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'Create Product',
                    roles: [RoleType[RoleType.ADMIN]]
                }
            },
            {
                path: 'details',
                component: AdminProductDetailsComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'Product Details',
                    roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
                }
            },
            {
                path: 'edit',
                component: ProductFormComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'Edit Product',
                    roles: [RoleType[RoleType.ADMIN]]
                }
            },
        ]
    },
    {
        path: 'users',
        component: AdminUserListComponent,
        canActivate: [RoleGuard],
        data: {
            title: 'Admin Users',
            roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
        },
        children: [
            {
                path: 'create',
                component: UserFormComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'Create User',
                    roles: [RoleType[RoleType.ADMIN]]
                }
            },
            {
                path: 'details',
                component: UserDetailsComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'User Details',
                    roles: [RoleType[RoleType.ADMIN], RoleType[RoleType.USER]],
                }
            },
            {
                path: 'edit',
                component: UserFormComponent,
                canActivate: [RoleGuard],
                data: {
                    title: 'Edit User',
                    roles: [RoleType[RoleType.ADMIN]]
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
