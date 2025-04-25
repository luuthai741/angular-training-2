import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {getFirstActivatedRouteSnapshot, getParamValue} from "../../../../shared/utils/router-helper";
import {ROUTE} from "../../../../shared/constant/public-url";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent {
    users: User[];
    isAdmin: boolean = this.authService.isAdmin();
    selectedUser: any = null;
    isShowForm: boolean = false;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
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
                this.selectedUser = null;
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_EDIT)) {
                const userId = getParamValue(getFirstActivatedRouteSnapshot(this.activatedRoute), 'id');
                this.selectedUser = this.userService.getUserById(parseInt(userId));
                this.isShowForm = true;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_DETAILS)) {
                const userId = getParamValue(getFirstActivatedRouteSnapshot(this.activatedRoute), 'id');
                this.selectedUser = this.userService.getUserById(parseInt(userId));
                this.isShowForm = false;
            } else if (event.url.includes(ROUTE.ADMIN_USERS_CREATE)) {
                this.isShowForm = true;
                this.createUser();
            }
        });
    }

    setSelectedUser(user: User) {
        if (this.selectedUser == user) {
            return;
        }
        this.selectedUser = user;
        this.router.navigate([ROUTE.ADMIN_USERS_DETAILS, user.id]);
    }

    createUser() {
        this.selectedUser = {};
        this.router.navigate([ROUTE.ADMIN_USERS_CREATE]);
    }


}