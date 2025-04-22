export interface ControlValidator {
    title: string,
    controlName: string;
    validatorNames: string[];
    currentValidator?: string;
}