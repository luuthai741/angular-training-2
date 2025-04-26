import {Component} from '@angular/core';

import {ProductService} from './shared/services/product.service';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter, map, mergeMap} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private productService: ProductService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title) {
        this.productService.initProducts();
        this.setPageTitle();
    }

    setPageTitle() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            mergeMap(route => route.data)
        ).subscribe(data => {
            if (data['title']) {
                this.titleService.setTitle(data['title']);
            }
        });
    }
}
