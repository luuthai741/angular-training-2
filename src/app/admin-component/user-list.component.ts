import {Component, OnInit} from "@angular/core";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";

@Component({
    selector: "app-user-list",
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
        if (this.currentUser && this.currentUser?.roles?.findIndex((role: string) => role === "Admin") !== -1) {
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