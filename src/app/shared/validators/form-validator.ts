import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {removeCurrencyFormat} from "../utils/format-helper";

export function usernameExistsValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!window.localStorage.getItem('users')) {
            return null;
        }
        const usernames = JSON.parse(window.localStorage.getItem('users')).map((user: { username: string; }) => {
            return user.username;
        });
        return usernames.includes(control.value)
            ? {usernameExisting: true}
            : null;
    };
}

export function numberOnlyValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && !/^\d+$/.test(value)) {
            return {'invalidNumber': true};
        }
        return null;
    };
}

export function passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && !/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{9,}$/.test(value)) {
            return {'invalidPassword': true};
        }
        return null;
    };
}

export function fullNameValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && (!/^[a-zA-Z\s]*$/.test(value) || value.length > 20)) {
            return {'invalidFullName': true};
        }
        return null;
    }
}

export function passwordMatchValidator(group: FormGroup) {
    const password = group.controls.password;
    const confirmPassword = group.controls.confirmPassword;
    return password.value !== confirmPassword.value
    && (password.touched || password.value != '')
        ? {mismatch: true}
        : null;
}

export function ageValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return value && (value < 1 || value > 99)
            ? {'invalidAge': true}
            : null;
    }
}

export function priceValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = removeCurrencyFormat(control.value as string);
        return value && (value <= 0 || value > 1000)
            ? {'invalidPrice': true}
            : null;
    }
}

export function imageUrlValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const pattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
        return (value && !pattern.test(value))
            ? {'invalidImageUrl': true}
            : null;
    };
}