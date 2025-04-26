import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {passwordValidator, usernameExistsValidator} from "../validators/form-validator";

@Directive({
    selector: '[invalidPassword]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InvalidPasswordDirective),
            multi: true,
        },
    ],
})
export class InvalidPasswordDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) {
            return {required: true};
        }
        return passwordValidator()(control);
    }
}