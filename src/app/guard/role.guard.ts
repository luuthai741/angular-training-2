import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable({
    providedIn: "root",
})
export class RoleGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser){
            console.log("Not logged in");
            this.router.navigate(['/login']);
            return false;
        }
        const requiredRoles = route.data['roles'] as string[];
        const hasRole = requiredRoles.some(role => currentUser.roles.includes(role));
        if (!hasRole) {
            console.log("Not permission");
            this.router.navigate(['/unauthorized']);
            return false;
        }
        return true;
    }
}