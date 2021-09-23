import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { Grupo } from 'src/app/models/grupo';


@Injectable({
  providedIn: 'root',
})
export class GrupoForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {

    clase_id: {required:'El descripcion es requerido',},
    nombre: {required:'El observacion es requerido',},
    descripcion: {required:'El valor_costo es requerido',},
    orden: {required:'El valor_venta es requerido',}
  };

  // Exists
  // lastEmails: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.defaultStatus();
  }

  private createForm(): void {
    this.group = this.formBuilder.group(
      {

        clase_id: [null, Validators.required],
        nombre: [null, Validators.required],
        descripcion: [null, Validators.required],
        orden: [null, Validators.required]

      },

    );
  }

  set data(grupo: Grupo) {
    this.group.patchValue({
      clase_id: grupo.clase_id,
      nombre: grupo.nombre,
      descripcion: grupo.descripcion,
      orden: grupo.orden
    });
  }

  set editing(action: string) {
    switch (action) {
      case 'update':
        this.isEditing = true;
        break;
      case 'create':
        this.isEditing = false;
        break;
      default:
        this.isEditing = false;
        break;
    }
  }

  defaultStatus(): void {
    this.state = {
      error: false,
      message: '',
      loading: false,
    };
  }

  field(formControlName: string): AbstractControl {
    return this.group?.get(formControlName) as AbstractControl;
  }

  setExistErrors(): void {
    // this.email?.setErrors({ exists: true });
    // this.lastEmails.push(this.email?.value);
    // this.email.setValidators(ValueExistsValidator(this.lastEmails));
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

  // get birthdayFormated(): string {
  //   const date: any = this.birthday.value;
  //   if (typeof date === 'string') {
  //     return date;
  //   }

  //   return date ? date.format('YYYY-MM-DD') : null;
  // }
}
