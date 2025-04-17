import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";
import {Router} from "@angular/router";
import {MessageResponse} from "../../../../core/models/message-response.model";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent implements OnInit {
    users: User[];
    isAdmin: boolean = false;
    currentUser: User = null;
    messageResponse: MessageResponse = null;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state;
        if (state) {
            this.messageResponse = state as MessageResponse;
            console.log(this.messageResponse);
        }
    }

    ngOnInit(): void {
        this.users = this.userService.getUsers()
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser && this.currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
    }

    deleteUser(user: User) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            this.userService.remove(user);
            this.users = this.userService.getUsers();
        }
    }
}