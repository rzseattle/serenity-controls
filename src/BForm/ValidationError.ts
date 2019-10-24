export class ValidationError {
    fieldErrors: Map<string, string[]> = new Map();
    formErrors: string[] = [];

    constructor(fieldErrors: Map<string, string[]> = new Map<string, string[]>(), formErrors: string[] = []) {
        this.fieldErrors = fieldErrors;
        this.formErrors = formErrors;
    }

    isValid = () => {
        if (this.fieldErrors.size == 0 && this.formErrors.length == 0) {
            return true;
        }
        return false;
    };
}
