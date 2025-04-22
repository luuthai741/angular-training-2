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
    showConfirmDialog: boolean = false;
    selectedProduct: Product = null;

    constructor(private productService: ProductService,
                private authService: AuthService,
                private router: Router) {
        this.messageResponse = getMessageResponse(this.router);
        console.log(this.messageResponse);
    }


    ngOnInit(): void {
        this.products = this.productService.getAllProducts();
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
    }

    closeConfirmDialog() {
        this.showConfirmDialog = false;
        this.selectedProduct = null;
    }

    deleteProduct(product: Product): void {
        this.showConfirmDialog = true;
        this.selectedProduct = product;
    }

    handleConfirmDelete(isConfirmed: boolean): void {
        if (!isConfirmed) {
            this.closeConfirmDialog();
            return;
        }
        this.productService.deleteProduct(this.selectedProduct);
        this.products = this.productService.getAllProducts();
        this.closeConfirmDialog();
    }
}