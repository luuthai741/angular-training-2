import {Injectable} from "@angular/core";
import {Product} from "../../core/models/product.model";

@Injectable({
    providedIn: 'root',
})
export class ProductContextService {
    private selectedProduct: Product = null;

    setSelectedProduct = (selectedProduct: Product) => {
        this.selectedProduct = selectedProduct;
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    removeSelectedProduct() {
        this.selectedProduct = null;
    }
}