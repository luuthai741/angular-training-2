import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appNumberInput]'
})
export class NumberInputDirective {
    @Input('appNumberInput') appNumberInput: 'number' | 'decimal' = 'number';

    constructor(private el: ElementRef<HTMLInputElement>) {
    }

    @HostListener('input', ['$event'])
    onInputChange(event: Event): void {
        const input = this.el.nativeElement;
        let value = input.value;
        if (this.appNumberInput === 'number') {
            value = value.replace(/[^0-9]/g, '');
        } else if (this.appNumberInput === 'decimal') {
            value = value.replace(/[^0-9.]/g, '');
            if (value.startsWith('.')) {
                value = '0' + value;
            }
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        }
        if (input.value !== value) {
            input.value = value;
            const newEvent = new Event('input', {bubbles: true});
            input.dispatchEvent(newEvent);
        }
    }

    @HostListener('blur')
    onBlur(): void {
        const input = this.el.nativeElement;
        let value = input.value;
        if (this.appNumberInput === 'decimal') {
            if (value && !value.includes('.')) {
                value += '.00';
            } else if (value.endsWith('.')) {
                value += '00';
            } else {
                const parts = value.split('.');
                if (parts.length === 2) {
                    if (parts[1].length === 0) {
                        value += '00';
                    } else if (parts[1].length === 1) {
                        value += '0';
                    }
                }
            }
            input.value = value;
            const newEvent = new Event('input', {bubbles: true});
            input.dispatchEvent(newEvent);
        }
    }
}
