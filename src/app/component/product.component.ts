import { Component, Input } from '@angular/core';
import { LoadingState } from '../constant/loading-state.model';
import { ProducerService } from '../service/product.service';
import { Product } from '../model/product.model';
@Component({
  selector: 'product',
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.image" [alt]="product.title" />
      </div>
      <div class="product-info">
        <h4 class="product-name" [routerLink]=[product.id]>{{ product.title }}</h4>
        <p class="product-desc">{{ product.description | truncate }}</p>
        <div class="product-category">Category: {{ product.category | titlecase }}</div>
        <div class="product-rating">
          ⭐ {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input('product') product!: Product;
}
