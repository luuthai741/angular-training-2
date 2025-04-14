import {NgModule} from '@angular/core';
import {AdminProductListComponent} from "./admin-component/product-list.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {ShareModule} from "./share.module";
import {CommonModule} from "@angular/common";
import {AdminUserListComponent} from "./admin-component/user-list.component";
import {UserFormComponent} from "./admin-component/user-form.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AdminProductListComponent,
        AdminUserListComponent,
        UserFormComponent,
    ],
    imports: [
        AdminRoutingModule,
        ShareModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {}