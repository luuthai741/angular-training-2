import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

export function getParamValue(snapshot: ActivatedRouteSnapshot, paramKey: string): any {
    return snapshot.params[paramKey];
}

export function getFirstActivatedRouteSnapshot(activatedRoute: ActivatedRoute): ActivatedRouteSnapshot {
    if (!activatedRoute) {
        return null;
    }
    return activatedRoute.snapshot.firstChild;
}