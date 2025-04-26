import {Component} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {ROUTE} from "../../../../shared/constant/public-url";
import {UserContextService} from "../../../../shared/services/user-context.service";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent {
    users: User[];
    isAdmin: boolean = this.authService.isAdmin();
    isShowForm: boolean = false;

    constructor(
        public userContext: UserContextService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
    ) {
        this.userContext.removeSelectedUser();
        this.users = this.userService.getUsers()
        this.handleRouterListening();
    }


    handleRouterListening(): void {
        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            if (event.url === ROUTE.ADMIN_USERS) {
                this.users = this.userService.getUsers();
                this.userContext.removeSelectedUser();
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_EDIT)) {
                this.replaceUser(this.userContext.getSelectedUser());
                this.isShowForm = true;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_DETAILS)) {
                this.replaceUser(this.userContext.getSelectedUser());
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_CREATE)) {
                this.createUser();
            }
        });
    }

    replaceUser(user:User): void {
        if (this.users.length == 0 || !user) {
            return;
        }
        const index = this.users.findIndex((u) => u.id === user.id);
        this.users = [
            ...this.users.slice(0, index),
            user,
            ...this.users.slice(index + 1),
        ];
    }

    setSelectedUser(user: User) {
        if (this.userContext.getSelectedUser()?.id == user.id) {
            return;
        }
        this.userContext.setSelectedUser(user);
        this.router.navigate([ROUTE.ADMIN_USERS_DETAILS]);
    }

    createUser() {
        this.userContext.removeSelectedUser();
        this.router.navigate([ROUTE.ADMIN_USERS_CREATE]);
        this.isShowForm = true;
    }

}