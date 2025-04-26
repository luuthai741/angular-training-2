import {Component, DoCheck, OnInit} from "@angular/core";
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {ROUTE} from "../../../../shared/constant/public-url";
import {UserContextService} from "../../../../shared/services/user-context.service";

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit, DoCheck {
    user: User;
    currentUser: User = null;
    showConfirmDialog: boolean = false;
    ROUTE = ROUTE;
    isAdmin: boolean = this.authService.isAdmin();

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private userContext: UserContextService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (!this.userContext.getSelectedUser()) {
            this.router.navigate([ROUTE.NOT_FOUND]);
            return;
        }
        this.user = this.userContext.getSelectedUser();
    }

    ngDoCheck(): void {
        const updatedUser = this.userContext.getSelectedUser();
        if (updatedUser !== this.user) {
            this.user = updatedUser;
        }
    }

    deleteUser(user: User) {
        this.showConfirmDialog = true;
    }

    closeConfirmDialog() {
        this.showConfirmDialog = false;
    }

    handleConfirmDelete(isConfirmed: boolean) {
        if (!isConfirmed) {
            this.closeConfirmDialog();
            return;
        }
        this.userService.remove(this.user);
        this.closeConfirmDialog();
        this.router.navigate([ROUTE.ADMIN_USERS]);
    }

}