import {Injectable} from "@angular/core";
import {Product} from "../../core/models/product.model";
import {User} from "../../core/models/user.model";

@Injectable({
    providedIn: 'root',
})
export class UserContextService {
    private selectedUser: User = null;

    setSelectedUser = (selectedProduct: User) => {
        this.selectedUser = selectedProduct;
    }

    getSelectedUser = () => {
        return this.selectedUser;
    }

    removeSelectedUser = () => {
        this.selectedUser = null;
    }
}