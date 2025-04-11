import { Component } from '@angular/core';
import { ProducerService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'product-detail',
  templateUrl: './product-details.component.html',
})
export class ProductDetailComponent {
  productId: string | null = null;
  product: Product = null;
  constructor(
    private productService: ProducerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId === null) {
      return;
    }
    this.productService
      .getProductById(parseInt(this.productId))
      .subscribe((data) => {
        this.product = data;
      });
  }
}
