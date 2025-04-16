import {Component, Input} from '@angular/core';

import {Product} from '../../../core/models/product.model';

@Component({
  selector: 'common-product',
  template: `
      <div class="product-card">
          <div class="product-image">
              <img [src]="product.image" [alt]="product.title"/>
          </div>
          <div class="product-info">
              <h4 class="product-name" [routerLink]="['products/',product.id]">{{ product.title }}</h4>
              <p class="product-desc">{{ product.description | truncate }}</p>
              <div class="product-category">Category: {{ product.category | titlecase }}</div>
              <div class="product-category">{{ product.price | currency }}</div>
              <div class="product-rating">
                  ⭐ {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </div>
          </div>
      </div>
  `,
  styleUrls: ['../styles/product.component.css'],
})
export class ProductComponent {
  @Input('product') product!: Product;
}
