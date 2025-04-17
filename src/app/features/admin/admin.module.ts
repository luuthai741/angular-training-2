import {NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {ShareModule} from "../../shared/share.module";
import {ReactiveFormsModule} from "@angular/forms";

import {AdminUserListComponent} from "./components/user/user-list.component";
import {AdminProductListComponent} from "./components/product/admin-product-list.component";
import {UserFormComponent} from "./components/user/user-form.component";
import {ProductFormComponent} from "./components/product/product-form.component";

@NgModule({
    declarations: [
        AdminUserListComponent,
        AdminProductListComponent,
        UserFormComponent,
        ProductFormComponent
    ],
    imports: [
        AdminRoutingModule,
        ShareModule,
        ReactiveFormsModule,
    ]
})
export class AdminModule {}