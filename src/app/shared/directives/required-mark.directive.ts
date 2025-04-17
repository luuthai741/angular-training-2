import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {AbstractControl, FormGroupDirective} from "@angular/forms";

@Directive({
    selector: '[appRequiredMark]',
})
export class RequiredMarkDirective implements OnInit {
    @Input('appRequiredMark') controlName: string;
    constructor(private elementRef: ElementRef, private formGroupDirective: FormGroupDirective) {
    }
    ngOnInit(): void {
        const formGroup = this.formGroupDirective.form;
        const control = formGroup.get(this.controlName);
        if (!control) {
            return;
        }
        const validator = control?.validator?.({} as AbstractControl);
        const isRequired = validator?.['required'];
        if (!isRequired) {
            return;
        }
        this.elementRef.nativeElement.innerHTML += '<span class="text-danger">*</span>';
    }

}