export function removeCurrencyFormat(value: any): any {
    const strValue = String(value);
    if (strValue.includes('$')) {
        return strValue.replace('$', '');
    }
    return strValue;
}