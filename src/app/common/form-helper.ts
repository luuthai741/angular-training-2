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

    static focusOnInvalidField(formFields: QueryList<ElementRef>, form: FormGroup) {
        for (const formField of formFields.toArray()) {
            const controlName =  formField.nativeElement.getAttribute("formControlName");
            if (controlName && form.get(controlName)?.invalid) {
                formField.nativeElement.focus();
                break;
            }
        }
    }
}