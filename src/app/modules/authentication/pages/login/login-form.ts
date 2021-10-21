import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientAccess } from 'src/app/interfaces/authentication.interface';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginForm {
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    username: {
      required: 'El usuario es requerido',
    },
    password: {
      required: 'La contraseña es requerido',
    },
    rememberMe: {
      required: 'La campo es requerido',
    },
  };

  constructor(private formBuilder: FormBuilder) {
    this.group = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [null],
    });

    this.defaultStatus();
  }

  get data(): ClientAccess {
    const { username, password, rememberMe } = this.group.value;
    return {
      username,
      password,
      remember_me: rememberMe,
    };
  }

  defaultStatus(): void {
    this.state = {
      message: '',
      loading: false,
    };
  }

  submiting(): void {
    this.state.loading = true;
  }

  field(formControlName: string): AbstractControl {
    return this.group?.get(formControlName) as AbstractControl;
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
}
