import {Directive, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appNumberInput]'
})
export class NumberInputDirective {
    @Input('appNumberInput') inputType: 'number' | 'decimal' = 'number';

    @HostListener('input', ['$event'])
    onInputChange(event: any): void {
        const input = event.target;
        let value = input.value;
        if (this.inputType === 'number') {
            value = value.replace(/[^0-9]/g, '');
            value = value > 99
                ? 99
                : value < 0
                    ? 0
                    : value;
        } else if (this.inputType === 'decimal') {
            value = value.replace(/[^0-9.]/g, '');
            if (value.startsWith('.')) {
                value = '0' + value;
            }
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        }
        input.value = value;
    }
}
