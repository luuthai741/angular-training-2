import {Component, OnInit} from '@angular/core';

import {LoadingStateType} from '../../../shared/constant/loading-state.type';
import {ProductService} from '../../../core/services/product.service';
import {Product} from '../../../core/models/product.model';

@Component({
    selector: 'common-products',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    loadingState = LoadingStateType;
    products: Product[] = [];
    searchTerm: string = '';

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
        this.loading = LoadingStateType.LOADING;
        this.products = this.productService.getAllProduct()
        this.loading = LoadingStateType.LOADED;
    }

    get filterProducts(): Product[] {
        if (this.searchTerm === '') {
            return this.products;
        }
        return this.products.filter(product =>
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
}
