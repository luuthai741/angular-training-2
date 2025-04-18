import {Component, OnInit} from "@angular/core";

import {ProductService} from "../../../../shared/services/product.service";
import {Product} from "../../../../core/models/product.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";
import {Router} from "@angular/router";
import {MessageResponse} from "../../../../core/models/message-response.model";
import {getMessageResponse} from "../../../../shared/utils/router-helper";

@Component({
    selector: 'admin-product-list',
    templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent implements OnInit {
    products: Product[];
    isAdmin: boolean = false;
    messageResponse: MessageResponse = null;

    constructor(private productService: ProductService,
                private authService: AuthService,
                private router: Router) {
        this.messageResponse = getMessageResponse(this.router);
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