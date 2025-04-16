import {GenderType} from "../../shared/constant/gender.type";
import {RoleType} from "../../shared/constant/role.type";

export interface User {
    id: number,
    username: string;
    password: string;
    fullName:string,
    age: number;
    gender: string;
    role: string;
    roleMetadata?: {
        adminCode?: string;
        subscriptionPlan?: string;
    }
}

export function mockUser():User {
    return {
        id: 1,
        username: 'admin',
        password: 'admin',
        fullName: 'Admin',
        age: 18,
        gender: GenderType[GenderType.MALE],
        role: RoleType[RoleType.ADMIN],
    };
}
