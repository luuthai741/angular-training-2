import {Component, OnInit} from "@angular/core";

import {ProductService} from "../../../../shared/services/product.service";
import {Product} from "../../../../core/models/product.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ROUTE} from "../../../../shared/constant/public-url";
import {getFirstActivatedRoute, getParamValue} from "../../../../shared/utils/router-helper";

@Component({
    selector: 'admin-product-list',
    templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent implements OnInit {
    ROUTE = ROUTE;
    products: Product[];
    isAdmin: boolean = false;
    showConfirmDialog: boolean = false;
    selectedProduct: any = null;

    constructor(private productService: ProductService,
                private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute ) {
        this.handleRedirect();
    }

    handleRedirect(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && event.url === ROUTE.ADMIN_PRODUCTS) {
                this.products = this.productService.getAllProducts();
                this.selectedProduct = null;
            }
        });
        if (this.router.url.includes(ROUTE.ADMIN_PRODUCTS_DETAILS)) {
            const productId = getParamValue(getFirstActivatedRoute(this.activatedRoute), 'id');
            this.selectedProduct = this.productService.getProductById(parseInt(productId));
            this.router.navigate([ROUTE.ADMIN_PRODUCTS_DETAILS, productId]);
        }
        if (this.router.url.includes(ROUTE.ADMIN_PRODUCTS_EDIT)) {
            const productId = getParamValue(getFirstActivatedRoute(this.activatedRoute), 'id');
            this.selectedProduct = this.productService.getProductById(parseInt(productId));
            this.router.navigate([ROUTE.ADMIN_PRODUCTS_EDIT, productId]);
        }
        if (this.router.url.includes(ROUTE.ADMIN_PRODUCTS_CREATE)) {
            this.createProduct();
        }
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

    c(product: Product): void {
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

    setSelectedProduct(product: Product) {
        if (this.selectedProduct == product) {
            return;
        }
        this.selectedProduct = product;
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_DETAILS, product.id]);
    }

    createProduct(){
        this.selectedProduct = {};
        this.router.navigate([ROUTE.ADMIN_PRODUCTS_CREATE]);
    }
}