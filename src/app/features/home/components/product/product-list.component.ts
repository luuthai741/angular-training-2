import {Component, OnInit} from '@angular/core';

import {LoadingStateType} from '../../../../shared/constant/loading-state.type';
import {ProductService} from '../../../../shared/services/product.service';
import {Product} from '../../../../core/models/product.model';
import {MessageResponse} from "../../../../core/models/message-response.model";
import {Router} from "@angular/router";
import {getMessageResponse} from "../../../../shared/utils/router-helper";
import {MessageType} from "../../../../shared/constant/message.type";
import {isError} from "../../../../shared/constant/message-mapping";
import {isSuccess} from "angular-in-memory-web-api";

@Component({
    selector: 'products',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    loadingState = LoadingStateType;
    products: Product[] = [];
    searchTerm: string = '';
    messageResponse: MessageResponse = null;
    messageType: MessageType;

    constructor(private productService: ProductService,
                private router: Router,) {
        this.messageResponse = getMessageResponse(this.router);
        if (this.messageResponse) {
            this.messageType = this.setMessageType();
        }
    }

    setMessageType() {
        if (isError(this.messageResponse.statusCode)) {
            return MessageType.ERROR;
        } else if (isSuccess(this.messageResponse.statusCode)) {
            return MessageType.SUCCESS;
        }
        return null;
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
