import {Directive, forwardRef, Input} from "@angular/core";
import {AbstractControl, FormGroup, NG_VALIDATORS, Validator} from "@angular/forms";
import {usernameExistsValidator} from "../validators/form-validator";

@Directive({
    selector: '[confirmPassword]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ConfirmPasswordDirective),
            multi: true,
        },
    ],
})
export class ConfirmPasswordDirective implements Validator {
    @Input('confirmPassword') originPassword: string;

    validate(confirmPasswordControl: AbstractControl): { [key: string]: any } | null {
        if (!confirmPasswordControl.value) {
            return {required: true};
        }
        const form = confirmPasswordControl.parent as FormGroup;
        const passwordControl = form.get(this.originPassword);
        if (confirmPasswordControl.value !== passwordControl.value) {
            return {mismatch: true};
        }
        return null;
    }
}