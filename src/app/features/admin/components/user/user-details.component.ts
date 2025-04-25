import {Component, OnInit} from "@angular/core";
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {ROUTE} from "../../../../shared/constant/public-url";

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
    user: User;
    currentUser: User = null;
    showConfirmDialog: boolean = false;
    ROUTE = ROUTE;
    isAdmin: boolean = this.authService.isAdmin();

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.activatedRoute.paramMap.subscribe(params => {
            const userId = params.get("id");
            this.user = this.userService.getUserById(parseInt(userId));
        })
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