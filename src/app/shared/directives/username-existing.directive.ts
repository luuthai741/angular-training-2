import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {usernameExistsValidator} from "../validators/form-validator";

@Directive({
    selector: '[usernameExisting]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => UsernameExistingDirective),
            multi: true,
        },
    ],
})
export class UsernameExistingDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) {
            return {required: true};
        }
        return usernameExistsValidator()(control);
    }
}