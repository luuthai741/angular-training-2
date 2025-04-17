import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from "../services/auth.service";
import {User} from "../../core/models/user.model";
import {UserService} from "../services/user.service";
import {RoleType} from "../constant/role.type";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser: User = null;
    isHavePermission: boolean = false;

    constructor(private authService: AuthService,
                private userService: UserService,
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
            if (this.currentUser && (this.currentUser?.role == RoleType[RoleType.USER] || this.currentUser?.role == RoleType[RoleType.ADMIN])) {
                this.isHavePermission = true;
            }
        }, 500)
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}

