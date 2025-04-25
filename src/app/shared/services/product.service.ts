import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../core/models/product.model';

import {MessageResponse, MessageResponseBuilder} from "../../core/models/message-response.model";
import {removeCurrencyFormat} from "../utils/format-helper";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private products: Product[] = [];
    private productCategories: string[] = [];

    constructor(private httpClient: HttpClient) {
    }

    initProducts(): void {
        if (this.products.length != 0) {
            return;
        }
        this.products = !window.localStorage.getItem('products')
            ? []
            : JSON.parse(window.localStorage.getItem('products'))
        if (this.products.length == 0) {
            this.httpClient
                .get<Product[]>(`/products`)
                .subscribe((data) => {
                    this.products = data;
                    localStorage.setItem('products', JSON.stringify(this.products));
                });
        }
    }

    getProductCategories(): string[] {
        if (this.productCategories.length == 0) {
            const categories = new Set(this.products
                .map(product => product.category));
            this.productCategories = Array.from(categories);
        }
        return this.productCategories;
    }

    private createProductId(): number {
        return this.products.length > 0
            ? parseInt(String(this.products[this.products.length - 1].id)) + 1
            : 1;
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product {
        if (this.products.length === 0) {
            return null;
        }
        return this.products.find(product => product.id === id);
    }

    createProduct(product: Product): Observable<MessageResponse> {
        return new Observable<MessageResponse>(observable => {
            this.products = [
                ...this.products,
                {
                    ...product,
                    id: this.createProductId(),
                    price: removeCurrencyFormat(product.price as string),
                    rating: {
                        rate: 0,
                        count: 0
                    }
                }
            ];
            window.localStorage.setItem('products', JSON.stringify(this.products));
            observable.next(new MessageResponseBuilder()
                .withBody("productCreatedSuccess")
                .withStatusCode(201)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    updateProduct(product: Product): Observable<MessageResponse> {
        return new Observable<MessageResponse>(observable => {
            const index = this.products.findIndex((p) => p.id === product.id);
            if (index === -1) {
                observable.error(new MessageResponseBuilder()
                    .withBody("productIsNotFound")
                    .withStatusCode(404)
                    .withTimestamp(new Date())
                    .build());
                return;
            }
            const oldProduct = this.products[index];
            this.products = [
                ...this.products.slice(0, index),
                {
                    ...product,
                    price: removeCurrencyFormat(product.price as string),
                    rating: oldProduct.rating,
                },
                ...this.products.slice(index + 1),
            ];
            window.localStorage.setItem('products', JSON.stringify(this.products));
            observable.next(new MessageResponseBuilder()
                .withBody("productUpdatedSuccess")
                .withStatusCode(200)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    deleteProduct(product: Product): void {
        this.products = this.products.filter((p) => {
            return p.id !== product.id;
        });
        if (this.products.length > 0) {
            window.localStorage.setItem('products', JSON.stringify(this.products));
            return;
        }
        window.localStorage.removeItem('products');
    }

}
