import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * @description
 * Custom validator to check url is valid
 *
 * @param controlName example 'web'
 *
 * @returns An error map with the `url` property
 * if the validation check fails, otherwise `null`.
 */
export function UrlValidator(controlName: string): ValidationErrors | null {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const value = control?.value;
    if (value !== null && value !== '') {
      const reg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      if (!value.match(reg)) {
        control.setErrors({ url: true });
      } else {
        control.setErrors(null);
      }
    }

    return null;
  };
}

/**
 * @description
 * Custom validator to check that two fields match
 *
 * @param controlName example 'password'
 * @param matchingControlName example 'passwordConfirm'
 *
 * @returns An error map with the `mustMatch` property
 * if the validation check fails, otherwise `null`.
 */
export function MustMatch(
  controlName: string,
  matchingControlName: string
): ValidationErrors | null {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }

    // Set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}

/**
 * @description
 * Custom validator to check cellphone start with 9
 *
 * @param controlName example 'cellphone'
 *
 * @returns An error map with the `notCellPhone` property
 * if the validation check fails, otherwise `null`.
 */
export function CellPhoneValidator(
  controlName: string
): ValidationErrors | null {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];

    if (control) {
      if (control.errors && !control.errors.notCellPhone) {
        return null;
      }

      const value: string = control.value;

      if (value === undefined || value === null) {
        return control?.errors ?? null;
      }

      if (value.length > 0 && !value.startsWith('9')) {
        control.setErrors({ notCellPhone: true });
      } else {
        control.setErrors(null);
      }
    }

    return null;
  };
}

/**
 * @description
 * Custom validator to check value exists in db
 *
 * @param controlName example 'password'
 * @param matchingControlName example 'passwordConfirm'
 *
 * @returns An error map with the `exists` property
 * if the validation check fails, otherwise `null`.
 */
export function ValueExistsValidator(
  lastValue: string | string[] | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && lastValue) {
      if (control.errors && !control.errors.exists) {
        return null;
      }

      const value: string = control.value;
      const errors = { exists: true, ...control?.errors };

      if (typeof lastValue === 'string') {
        return value === lastValue ? errors : null;
      } else if (typeof lastValue === 'object') {
        return lastValue.includes(value) ? errors : null;
      }
    }

    return null;
  };
}
