import {NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {ShareModule} from "../../shared/share.module";
import {ReactiveFormsModule} from "@angular/forms";

import {AdminUserListComponent} from "./components/user/user-list.component";
import {AdminProductListComponent} from "./components/product/admin-product-list.component";
import {UserFormComponent} from "./components/user/user-form.component";
import {ProductFormComponent} from "./components/product/product-form.component";
import {UserDetailsComponent} from "./components/user/user-details.component";
import {AdminProductDetailsComponent} from "./components/product/admin-product-details.component";

@NgModule({
    declarations: [
        AdminUserListComponent,
        AdminProductListComponent,
        UserFormComponent,
        ProductFormComponent,
        UserDetailsComponent,
        AdminProductDetailsComponent
    ],
    imports: [
        AdminRoutingModule,
        ShareModule,
        ReactiveFormsModule,
    ]
})
export class AdminModule {}