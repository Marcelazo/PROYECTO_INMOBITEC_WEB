import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/validators/validators';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';

@Injectable({
  providedIn: 'root',
})
export class PasswordForm {
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    password: {
      required: 'Este campo es requerido',
      minlength: 'Debe de tener 6 carácteres como mínimo',
    },
    passwordConfirm: {
      required: 'Este campo es requerido',
      minlength: 'Debe de tener 6 carácteres como mínimo',
      mustMatch: 'Las contraseñas no coinciden',
    },
  };

  constructor(private formBuilder: FormBuilder) {
    this.group = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordConfirm: [null, [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [MustMatch('password', 'passwordConfirm')],
      }
    );

    this.setDefaultStatus();
  }

  setDefaultStatus(): void {
    this.state = {
      message: null,
      loading: false,
    };
  }

  submiting(): void {
    this.state.loading = true;
  }

  field(name: string): AbstractControl {
    return this.group?.get(name) as AbstractControl;
  }

  showErrors(inputName: string): string | null {
    const control = this.group.get(inputName);
    const controlErrors = control?.errors;
    if (controlErrors === undefined || controlErrors === null) {
      return null;
    }

    for (const key in controlErrors) {
      if (Object.prototype.hasOwnProperty.call(controlErrors, key)) {
        // const error = controlErrors[key];
        const input = this.errors[inputName];
        return input[key] ?? 'El campo es inválido';
      }
    }

    return 'El campo es inválido';
  }

  get invalid(): boolean {
    return this.group.invalid;
  }

  get valid(): boolean {
    return this.group.valid;
  }

  get data(): any {
    return this.group.value;
  }
}
