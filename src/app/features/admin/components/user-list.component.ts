import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {AuthService} from "../../../core/services/auth.service";
import {RoleType} from "../../../shared/constant/role.type";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent implements OnInit {
    users: User[];
    isAdmin: boolean = false;
    currentUser: User = null;

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
        if (window.confirm("Are you sure you want to delete this common?")) {
            this.userService.remove(user);
            this.users = this.userService.getUsers();
        }
    }
}