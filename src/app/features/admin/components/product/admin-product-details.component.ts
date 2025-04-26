import {Component, DoCheck, OnInit} from "@angular/core";
import {User} from "../../../../core/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {ROUTE} from "../../../../shared/constant/public-url";
import {Product} from "../../../../core/models/product.model";
import {ProductService} from "../../../../shared/services/product.service";
import {ProductContextService} from "../../../../shared/services/product-context.service";

@Component({
    selector: 'admin-product-details',
    templateUrl: './admin-product-details.component.html'
})
export class AdminProductDetailsComponent implements OnInit, DoCheck {
    product: Product;
    currentUser: User = null;
    showConfirmDialog: boolean = false;
    ROUTE = ROUTE;
    isAdmin: boolean = this.authService.isAdmin();

    constructor(private productService: ProductService,
                private router: Router,
                private authService: AuthService,
                private productContext: ProductContextService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (!this.productContext.getSelectedProduct()) {
            this.router.navigate([ROUTE.NOT_FOUND]);
            return;
        }
        this.product = this.productContext.getSelectedProduct();
    }

    ngDoCheck(): void {
        const updatedProduct = this.productContext.getSelectedProduct();
        if (updatedProduct !== this.product) {
            this.product = updatedProduct;
        }
    }

    deleteProduct(product: Product) {
        this.showConfirmDialog = true;
    }

    closeConfirmDialog() {
        this.showConfirmDialog = false;
    }

    handleConfirmDelete(isConfirmed: boolean) {
        if (!isConfirmed) {
            this.closeConfirmDialog();
            return;
        }
        this.productService.deleteProduct(this.product);
        this.closeConfirmDialog();
        this.router.navigate([ROUTE.ADMIN_PRODUCTS]);
    }

}