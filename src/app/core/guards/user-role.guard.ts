import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {AuthService} from "../../shared/services/auth.service";
import {RoleType} from "../../shared/constant/role.type";
import {UserService} from "../../shared/services/user.service";
import {User} from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserRoleGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const loggedInUser = this.authService.getCurrentUser();
        if (!loggedInUser) {
            console.log("Not logged in");
            this.router.navigate(['/login']);
            return false;
        }
        const userId: number = parseInt(route.paramMap.get("id"));
        if (userId !== loggedInUser.id) {
            console.log("User has not permission");
            this.router.navigate(['/unauthorized']);
            return false;
        }
        const userById: User = this.userService.getUserById(userId);
        if (!userById) {
            console.log("User is not found");
            this.router.navigate(['/not-found']);
            return false;
        }
        return true;
    }
}