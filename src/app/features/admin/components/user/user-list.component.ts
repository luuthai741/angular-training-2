import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {getFirstActivatedRoute, getParamValue} from "../../../../shared/utils/router-helper";
import {ROUTE} from "../../../../shared/constant/public-url";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent implements OnInit {
    users: User[];
    isAdmin: boolean = false;
    currentUser: User = null;
    selectedUser: any = null;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.users = this.userService.getUsers()
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser && this.currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
        this.handleRedirect();
    }

    handleRedirect(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && event.url === ROUTE.ADMIN_USERS) {
                this.users = this.userService.getUsers();
                this.selectedUser = null;
            }
        });
        if (this.router.url.includes(ROUTE.ADMIN_USERS_DETAILS)) {
            const userId = getParamValue(getFirstActivatedRoute(this.activatedRoute), 'id');
            this.selectedUser = this.userService.getUserById(parseInt(userId));
            this.router.navigate([ROUTE.ADMIN_USERS_DETAILS, userId]);
        }
        if (this.router.url.includes(ROUTE.ADMIN_USERS_EDIT)) {
            const userId = getParamValue(getFirstActivatedRoute(this.activatedRoute), 'id');
            this.selectedUser = this.userService.getUserById(parseInt(userId));
            this.router.navigate([ROUTE.ADMIN_USERS_EDIT, userId]);
        }
        if (this.router.url.includes(ROUTE.ADMIN_PRODUCTS_CREATE)) {
            this.createUser();
        }
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