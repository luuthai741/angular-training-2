import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent implements OnInit {
    users: User[];
    isAdmin: boolean = false;
    currentUser: User = null;
    showConfirmDialog: boolean = false;
    selectedUser: User = null;

    constructor(private userService: UserService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.users = this.userService.getUsers()
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser && this.currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
    }

    deleteUser(user: User) {
        this.showConfirmDialog = true;
        this.selectedUser = user;
    }

    closeConfirmDialog() {
        this.showConfirmDialog = false;
        this.selectedUser = null;
    }

    handleConfirmDelete(isConfirmed: boolean) {
        if (!isConfirmed) {
            this.closeConfirmDialog();
            return;
        }
        this.userService.remove(this.selectedUser);
        this.users = this.userService.getUsers();
        this.closeConfirmDialog();
    }
}