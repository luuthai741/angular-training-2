export enum GenderType {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2,
}

export function getGenderList() {
    return Object.keys(GenderType)
        .filter(key => !isNaN(Number(key)))
        .map(key => ({
            value: Number(key),
            label: GenderType[key]
        }));
}

export function getGender(value: number | string): string | undefined {
    return GenderType[value];
}