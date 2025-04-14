export interface User {
    id: number,
    username: string;
    password: string;
    fullName:string,
    age: number;
    gender: string;
    roles: string[];
    roleMetadata?: {
        adminCode?: string;
        subscriptionPlan?: string;
    }
}