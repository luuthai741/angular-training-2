import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {map} from "rxjs/operators";
import {MessageResponse, MessageResponseBuilder} from "../model/message-response.model";

@Injectable({
    providedIn: 'root',
})
export class ProducerService {
    constructor(private httpClient: HttpClient) {
    }

    getAllProduct(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`/products`);
    }

    getProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`/products/${id}`);
    }

    createProduct(product: Product): Observable<MessageResponse> {
        return this.httpClient.post<MessageResponse>(`/products`, product, {
            observe: 'response',
        })
            .pipe(
                map(response => new MessageResponseBuilder()
                    .withStatusCode(response.status)
                    .withTimestamp(new Date())
                    .withBody("Created product successfully")
                    .build())
            );
    }

    updateProduct(product: Product): Observable<MessageResponse> {
        return this.httpClient.put<MessageResponse>(`/products/${product.id}`, product, {
            observe: 'response',
        })
            .pipe(
                map(response => new MessageResponseBuilder()
                    .withStatusCode(response.status)
                    .withTimestamp(new Date())
                    .withBody("Updated product successfully")
                    .build())
            );
    }
}
