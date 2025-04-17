import {Component} from '@angular/core';

import {ProductService} from './shared/services/product.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private productService: ProductService) {
        this.productService.initProducts();
    }
}
