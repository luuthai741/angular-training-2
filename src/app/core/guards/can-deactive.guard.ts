import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

import {Injectable} from "@angular/core";
import {CanComponentDeactivate} from "./can-component-deactivate";

@Injectable({providedIn: 'root'})
export class CanDeActiveGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}