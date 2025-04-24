import {ActivatedRoute} from "@angular/router";

export function getParamValue(snapshot: ActivatedRoute, paramKey: string): any {
    console.log(snapshot);
    return snapshot?.snapshot.paramMap.get(paramKey);
}

export function getFirstActivatedRoute(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (!activatedRoute) {
        return null;
    }
    console.log(activatedRoute.firstChild);
    return activatedRoute.firstChild;
}