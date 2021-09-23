import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { Proyecto } from 'src/app/models/proyecto';


@Injectable({
  providedIn: 'root',
})
export class ProyectoForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    departamento_id: {required:'El departamento es requerido',},
    provincia_id: {required:'La provincia es requerido',},
    distrito_id: {required:'El distrito es requerido',},
    nombre: {required:'El nombre es requerido',},
    img_logo: {required:'La imagen del logo es requerido',},
    img_principal: {required:'La imagen principal es requerido',},
    //estado: {required:'El estado es requerido',}
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

        departamento_id: [null, Validators.required],
        provincia_id: [null, Validators.required],
        distrito_id: [null, Validators.required],
        nombre: [null, Validators.required],
        img_logo: [null, Validators.required],
        img_principal: [null, Validators.required]
      },

    );
  }

  set data(proyecto: Proyecto) {
    this.group.patchValue({
      departamento_id: proyecto.departamento_id,
      provincia_id: proyecto.provincia_id,
      distrito_id: proyecto.distrito_id,
      nombre: proyecto.nombre,
      img_logo: proyecto.img_logo,
      img_principal: proyecto.img_principal,
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
