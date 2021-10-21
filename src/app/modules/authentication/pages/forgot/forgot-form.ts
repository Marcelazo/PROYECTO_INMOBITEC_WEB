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
export class ForgotForm {
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    document: {
      required: 'El documento es requerido',
      minlength: 'El documento debe tener mínimo 8 dígitos',
      maxlength: 'El documento debe tener máximo 20 dígitos',
      exists: 'El número de documento ya existe',
    },
    fatherSurname: {
      required: 'El apellido paterno es requerido',
    },
    motherSurname: {
      required: 'EL apellido materno es requerido',
    },
  };

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({
      document: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      fatherSurname: [null, Validators.required],
      motherSurname: [null, Validators.required],
    });

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
