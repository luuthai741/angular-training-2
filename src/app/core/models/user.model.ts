import {GenderType} from "../../shared/constant/gender.type";
import {RoleType} from "../../shared/constant/role.type";

export interface User {
    id: number,
    username: string;
    password: string;
    fullName: string,
    age: number;
    gender: string;
    role: string;
    roleMetadata?: {
        adminCode?: string;
        subscriptionPlan?: string;
    }
}
