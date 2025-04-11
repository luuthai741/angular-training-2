import {NgModule} from '@angular/core';
import {AdminProductListComponent} from "./admin-component/product-list.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {ShareModule} from "./share.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AdminProductListComponent,
    ],
    imports: [
        AdminRoutingModule,
        ShareModule,
        CommonModule
    ]
})
export class AdminModule {}