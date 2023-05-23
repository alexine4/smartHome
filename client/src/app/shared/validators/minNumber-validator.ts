import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minNumber(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value < min) {
      return { minNumber: { requiredMin: min, actualValue: value } };
    }
    return null;
  };
}
