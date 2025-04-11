import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminProductListComponent} from "./admin-component/product-list.component";
import {ProductFormComponent} from "./admin-component/product-form.component";

const routes: Routes = [
    { path: 'products', component: AdminProductListComponent },
    { path: 'products/create', component: ProductFormComponent },
    { path: 'products/edit/:id', component: ProductFormComponent }, // 👈 sửa ở đây
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
