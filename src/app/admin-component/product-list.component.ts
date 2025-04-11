import {Component, OnInit} from "@angular/core";
import {ProducerService} from "../service/product.service";
import {Product} from "../model/product.model";

@Component({
    selector: 'admin-product-list',
    templateUrl:'product-list.component.html'
})
export class AdminProductListComponent implements OnInit {
    products: Product[];
    constructor(private productService: ProducerService) {
        console.log("in ProductFormComponent");
    }

    ngOnInit(): void {
        this.productService.getAllProduct().subscribe(products => this.products = products);
    }
}