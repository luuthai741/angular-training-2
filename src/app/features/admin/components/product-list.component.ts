import {Component, OnInit} from "@angular/core";

import {ProductService} from "../../../core/services/product.service";
import {Product} from "../../../core/models/product.model";
import {AuthService} from "../../../core/services/auth.service";
import {RoleType} from "../../../shared/constant/role.type";

@Component({
    selector: 'admin-products',
    templateUrl: './product-list.component.html'
})
export class AdminProductListComponent implements OnInit {
    products: Product[];
    isAdmin: boolean = false;

    constructor(private productService: ProductService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.products = this.productService.getAllProduct();
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
    }

    deleteProduct(product: Product): void {
        if (confirm("Are you sure you want to delete this product?")) {
            this.productService.deleteProduct(product)
            this.products = this.productService.getAllProduct();
        }
    }
}