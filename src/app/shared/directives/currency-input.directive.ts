import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: '[appCurrencyInput]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CurrencyInputDirective),
            multi: true,
        },
    ],
})
export class CurrencyInputDirective implements ControlValueAccessor {
    private onChange: (value: any) => void;
    private onTouched: () => void;

    constructor(private el: ElementRef<HTMLInputElement>) {}

    writeValue(value: any): void {
        if (value !== null && value !== undefined && value !== '') {
            const num = parseFloat(value);
            this.el.nativeElement.value = isNaN(num)
                ? '$'
                : this.formatValue(num.toFixed(2).toString());
        } else {
            this.el.nativeElement.value = '$';
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.el.nativeElement.disabled = isDisabled;
    }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const inputEl = event.target as HTMLInputElement;
        let raw = inputEl.value.replace(/[^0-9.]/g, '');
        const parts = raw.split('.');
        if (parts.length > 2) {
            raw = parts[0] + '.' + parts.slice(1).join('');
        }
        inputEl.value = this.formatValue(raw);
        this.onChange?.(raw);
    }

    @HostListener('blur')
    onBlur(): void {
        const raw = this.el.nativeElement.value.replace(/[^0-9.]/g, '');
        const num = parseFloat(raw);
        if (isNaN(num)) {
            this.el.nativeElement.value = '';
            this.onChange?.('');
        } else {
            const formatted = num.toFixed(2);
            this.el.nativeElement.value = this.formatValue(formatted);
            this.onChange?.(formatted);
        }
        this.onTouched?.();
    }

    private formatValue(value: string): string {
        return `$${value}`;
    }
}
