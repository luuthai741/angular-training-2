import {Component, OnInit} from '@angular/core';
import { LoadingState } from '../constant/loading-state.model';
import { ProducerService } from '../service/product.service';
import { Product } from '../model/product.model';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  loading: LoadingState = LoadingState.NOT_LOADED;
  loadingState = LoadingState;
  products: Product[] = [];
  constructor(private productService: ProducerService) {}
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = LoadingState.LOADING;
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.loading = LoadingState.LOADED;
        this.products = data;
      },
      error: (error) => {
        this.loading = LoadingState.LOADED;
      },
    });
  }
}
