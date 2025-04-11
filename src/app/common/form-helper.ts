import {FormGroup} from "@angular/forms";
import {ElementRef, QueryList} from "@angular/core";

export class FormHelper{
    static isInvalid(controlName: string, formGroup: FormGroup): boolean {
        const control = formGroup.get(controlName);
        return !!(control && control.invalid && control.touched);
    }

    static getError(controlName: string, formGroup: FormGroup, errorType: string): boolean {
        const control = formGroup.get(controlName);
        return !!(control?.hasError(errorType) && control?.touched);
    }
    static focusOnControl(formGroup: FormGroup, inputs: QueryList<ElementRef>){
        const invalidControlName = Object.keys(formGroup.controls).find(
            key => formGroup.get(key)?.invalid
        );

        if (invalidControlName) {
            const invalidInput = inputs.find(
                (el) => el.nativeElement.getAttribute('formControlName') === invalidControlName
            );
            invalidInput?.nativeElement.focus();
        }
    }
}