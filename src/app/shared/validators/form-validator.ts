import {AbstractControl, ValidationErrors} from '@angular/forms';

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

export function imageUrlValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const pattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
        const valid = pattern.test(value);
        return valid ? null : {invalidImageUrl: true};
    };
}