export function currencyFormat(value: string): any {
    if (value && !value.includes("$")) {
        return "$" + value;
    }
    return value;
}

export function removeCurrencyFormat(value: any): any {
    const strValue = String(value);
    if (strValue.includes('$')) {
        return strValue.replace('$', '');
    }
    return strValue;
}