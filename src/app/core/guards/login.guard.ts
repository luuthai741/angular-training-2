import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {AuthService} from "../services/auth.service";

@Injectable({
    providedIn: "root",
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser){
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}