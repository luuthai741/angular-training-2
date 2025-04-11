import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProducerService {
  constructor(private httpClient: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `/products/${product.id}`,
        product
    );
  }
}
