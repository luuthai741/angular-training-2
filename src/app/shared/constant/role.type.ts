export enum RoleType {
    ADMIN,
    USER,
    GUEST
}

export function getRoleList() {
    return Object.keys(RoleType)
        .filter(key => !isNaN(Number(key)))
        .map(key => ({
            value: Number(key),
            label: RoleType[key]
        }));
}

export function getRole(value: number | string): string | undefined {
    return RoleType[value];
}