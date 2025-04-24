import {Component, OnInit} from "@angular/core";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {ROUTE} from "../../../../shared/constant/public-url";
import {Product} from "../../../../core/models/product.model";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
    selector: 'admin-product-details',
    templateUrl: './admin-product-details.component.html'
})
export class AdminProductDetailsComponent implements OnInit {
    product: Product;
    currentUser: User = null;
    showConfirmDialog: boolean = false;
    ROUTE = ROUTE;

    constructor(private productService: ProductService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.activatedRoute.paramMap.subscribe(params => {
            const productId = params.get("id");
            this.product = this.productService.getProductById(parseInt(productId));
        })
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