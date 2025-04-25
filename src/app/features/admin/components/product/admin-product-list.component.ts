import {Component, OnInit} from "@angular/core";

import {ProductService} from "../../../../shared/services/product.service";
import {Product} from "../../../../core/models/product.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ROUTE} from "../../../../shared/constant/public-url";
import {getFirstActivatedRouteSnapshot, getParamValue} from "../../../../shared/utils/router-helper";

@Component({
    selector: 'admin-product-list',
    templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent {
    ROUTE = ROUTE;
    products: Product[];
    isAdmin: boolean = this.authService.isAdmin();
    selectedProduct: any = null;
    isShowForm: boolean = false;

    constructor(private productService: ProductService,
                private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
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
                this.selectedProduct = null;
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_EDIT)) {
                const productId = getParamValue(getFirstActivatedRouteSnapshot(this.activatedRoute), 'id');
                this.selectedProduct = this.productService.getProductById(parseInt(productId));
                this.isShowForm = true;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_DETAILS)) {
                const productId = getParamValue(getFirstActivatedRouteSnapshot(this.activatedRoute), 'id');
                this.selectedProduct = this.productService.getProductById(parseInt(productId));
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_PRODUCTS_CREATE)) {
                this.isShowForm = true;
                this.createProduct();
            }
        });
    }

    setSelectedProduct(product: Product) {
        if (this.selectedProduct == product) {
            return;
        }
        this.selectedProduct = product;
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_DETAILS, product.id]);
    }

    createProduct() {
        this.selectedProduct = {};
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_CREATE]);
    }
}