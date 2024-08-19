import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export function UniqueKeyValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value === 'unique') {
            return { unique: true };
        }
        return null;
    };
}

export function parseValidationErrors(control: FormControl) {
    return Object.keys(control.errors ?? {}).map((key) => {
        switch(key) {
            case 'required':
                return 'This field is required.';
            case 'email':
                return 'Please enter a valid email address.';
            case 'min':
                return `Please enter a value greater than ${control.errors?.min?.min}.`;
            case 'max':
                return `Please enter a value less than ${control.errors?.max?.max}.`;
            case 'unique':
                return 'This value is already in use.';
            default:
                return 'An error occurred.';
        }
    });
}