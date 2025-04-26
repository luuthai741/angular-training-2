export interface ControlValidator {
    title: string,
    controlName: string;
    validatorNames: string[];
    invalidControlName?: string;
}