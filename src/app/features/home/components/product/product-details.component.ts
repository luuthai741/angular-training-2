import {Component, OnInit} from '@angular/core';

import {ProductService} from '../../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../core/models/product.model';

@Component({
    selector: 'product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
    productId: string | null = null;
    product: Product = null;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id');
        if (this.productId === null) {
            return;
        }
        this.product = this.productService
            .getProductById(parseInt(this.productId));
    }
}
