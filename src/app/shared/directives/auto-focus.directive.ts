import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
    selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterViewInit{
    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit(): void {
        if (this.elementRef.nativeElement) {
            this.elementRef.nativeElement.focus();
        }
    }

}