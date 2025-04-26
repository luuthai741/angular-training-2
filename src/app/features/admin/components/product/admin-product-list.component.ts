import {Component} from "@angular/core";

import {ProductService} from "../../../../shared/services/product.service";
import {Product} from "../../../../core/models/product.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {ROUTE} from "../../../../shared/constant/public-url";
import {ProductContextService} from "../../../../shared/services/product-context.service";

@Component({
    selector: 'admin-product-list',
    templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent {
    ROUTE = ROUTE;
    products: Product[];
    isAdmin: boolean = this.authService.isAdmin();
    isShowForm: boolean = false;

    constructor(
        public productContext: ProductContextService,
        private productService: ProductService,
        private authService: AuthService,
        private router: Router,
    ) {
        this.productContext.removeSelectedProduct();
        this.products = this.productService.getAllProducts();
        this.handleRouterListening();
    }

    handleRouterListening(): void {
        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            if (event.url === ROUTE.ADMIN_PRODUCTS) {
                this.products = this.productService.getAllProducts();
                this.productContext.removeSelectedProduct();
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_EDIT)) {
                this.replaceProduct(this.productContext.getSelectedProduct());
                this.isShowForm = true;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_DETAILS)) {
                this.replaceProduct(this.productContext.getSelectedProduct());
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_CREATE)) {
                this.createProduct();
            }
        });
    }

    replaceProduct(product: Product): void {
        if (this.products.length == 0 || !product) {
            return;
        }
        const index = this.products.findIndex((p) => p.id === product.id);
        this.products = [
            ...this.products.slice(0, index),
            product,
            ...this.products.slice(index + 1),
        ];
    }

    setSelectedProduct(product: Product) {
        if (this.productContext.getSelectedProduct()?.id == product.id) {
            return;
        }
        this.productContext.setSelectedProduct(product);
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_DETAILS]);
    }

    createProduct() {
        this.productContext.removeSelectedProduct();
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_CREATE]);
        this.isShowForm = true;
    }
}