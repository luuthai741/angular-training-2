import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from "../services/auth.service";
import {User} from "../../core/models/user.model";
import {UserService} from "../services/user.service";
import {RoleType} from "../constant/role.type";
import {ActivatedRoute, Router} from "@angular/router";
import {publicUrl, ROUTE} from "../constant/public-url";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser: User = null;
    isHavePermission: boolean = false;
    ROUTE = ROUTE;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router,
                private activeRoute: ActivatedRoute,
    ) {
    }

    private intervalId: any;


    logout() {
        this.authService.logout();
        this.currentUser = null;
        this.isHavePermission = false;
    }

    ngOnInit(): void {
        this.userService.getUsers();
        this.intervalId = window.setInterval(() => {
            this.currentUser = this.authService.getCurrentUser();
            if (!this.currentUser) {
                publicUrl.includes(this.router.url)
                    ? this.router.navigate([this.router.url])
                    : this.router.navigate([ROUTE.LOGIN]);
            }
            if (this.currentUser?.role == RoleType[RoleType.USER] || this.currentUser?.role == RoleType[RoleType.ADMIN]) {
                this.isHavePermission = true;
            }
        }, 500)
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}

