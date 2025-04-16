import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ElementRef, QueryList} from "@angular/core";

export class FormHelper {
    static isInvalid(controlName: string, formGroup: FormGroup): boolean {
        const control = formGroup.get(controlName);
        return !!(control && control?.invalid && control?.touched);
    }

    static getError(controlName: string, formGroup: FormGroup, errorType: string): boolean {
        const control = formGroup.get(controlName);
        return !!(control?.hasError(errorType) && control?.touched);
    }

    static focusOnInvalidField(formFields: QueryList<ElementRef>, form: FormGroup) {
        for (const formField of formFields.toArray()) {
            const controlName = formField.nativeElement.getAttribute("formControlName");
            if (controlName && form.get(controlName)?.invalid) {
                formField.nativeElement.focus();
                break;
            }
        }
    }

    static clearFormValue(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            if (form.controls[key] instanceof FormGroup) {
                const subFormGroup = form.controls[key] as FormGroup;
                this.clearFormValue(form.controls[key] as FormGroup);
                subFormGroup.updateValueAndValidity();
            } else if (form.controls[key] instanceof FormControl) {
                const control = form.controls[key] as FormControl;
                control.setValue('');
                this.clearFormControl(control);
            }
        })
    }

    static clearFormErrors(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            if (form.controls[key] instanceof FormGroup) {
                const subFormGroup = form.controls[key] as FormGroup;
                this.clearFormValue(form.controls[key] as FormGroup);
                subFormGroup.updateValueAndValidity();
            } else if (form.controls[key] instanceof FormControl) {
                const control = form.controls[key] as FormControl;
                this.clearFormControl(control);
            }
        })
    }

    static clearFormControl(control: AbstractControl): void {
        control?.setErrors(null);
        control?.markAsPristine();
        control?.markAsUntouched();
        control?.updateValueAndValidity();
    }
}