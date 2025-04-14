import {Component, OnInit} from "@angular/core";
import {ProducerService} from "../service/product.service";
import {Product} from "../model/product.model";
import {AuthService} from "../service/auth.service";

@Component({
    selector: 'admin-product-list',
    templateUrl:'product-list.component.html'
})
export class AdminProductListComponent implements OnInit {
    products: Product[];
    isAdmin: boolean = false;
    constructor(private productService: ProducerService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.productService.getAllProduct().subscribe(products => this.products = products);
         const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser?.roles?.findIndex((role: string) => role === "Admin") !== -1) {
            this.isAdmin = true;
        }
    }
}