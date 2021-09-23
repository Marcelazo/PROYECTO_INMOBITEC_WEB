import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { Cliente } from 'src/app/models/cliente';
import { User } from 'src/app/models/user';
import { CellPhoneValidator } from 'src/app/validators/validators';

@Injectable({
  providedIn: 'root',
})
export class ClienteForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    nro_doc: {
      required: 'El nro_doc es requerido',
      minlength: 'El nro_doc debe tener 8 dígitos',
      maxlength: 'El nro_doc debe tener 8 dígitos',
      exists: 'El nro_doc ya existe',
    },
    nombre: {
      required: 'El nombre es requerido',
    },
    ape_pat: {
      required: 'Los apellidos son requerido',
    },
    ape_mat: {
      required: 'Los apellidos son requerido',
    },
    direccion: {
      required: 'La direccion es requerida',
    },
    telefono: {
      required: 'El teléfono es requerido',
      minlength: 'El teléfono debe tener al menos 6 dígitos',
       maxlength: 'El teléfono debe tener máximo 12 dígitos',
    },
    celular: {
      required: 'El  número de celular es requerido',
    },
    email: {
      required: 'El correo electrónico son requerido',
      email: 'El correo electrónico es invalido',
      exists: 'El correo electrónico ya esta registrado',
    },
    // cellphone: {
    //   required: 'El número celular es requerido',
    //   minlength: 'El número celular debe tener 9 dígitos',
    //   maxlength: 'El número celular debe tener 9 dígitos',
    //   notCellPhone: 'El número celular es inválido',
    //   exists: 'El número celular ya existe',
    // },
    // address: {
    //   required: 'El campo es requerido',
    // },
    departamento_id: {
      required: 'El campo es requerido',
    },
    provincia_id: {
      required: 'El campo es requerido',
    },
    distrito_id: {
      required: 'El campo es requerido',
    },
    // tipo_persona_id: {
    //   required: 'El campo es requerido',
    // },
    // birthday: {
    //   required: 'Seleccione la fecha de tu nacimiento',
    // },
  };

  // Exists
  lastEmails: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.defaultStatus();
  }

  private createForm(): void {
    this.group = this.formBuilder.group(
      {
        nro_doc: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
          ],
        ],
        nombre: [null, Validators.required],
        ape_pat: [null, Validators.required],
        ape_mat: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        direccion: [null, Validators.required],
        telefono: [
          null,[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ]
        ],
        celular: [null, Validators.required],
        departamento_id: [null, Validators.required],
        provincia_id: [null, Validators.required],
        distrito_id: [null, Validators.required],
        // tipo_persona_id: [null, Validators.required],
        // cellphone: [
        //   null,
        //   [
        //     Validators.required,
        //     Validators.minLength(9),
        //     Validators.maxLength(9),
        //   ],
        // ],
        // address: [null, Validators.required],
        //department: [null],
        //province: [null],
        //district: [null],
        // birthday: [null, [Validators.required]],
      },
      // {
      //   validators: [CellPhoneValidator('cellphone')],
      // }
    );
  }

  set data(cliente: Cliente) {
    this.group.patchValue({
      nro_doc: cliente.nro_doc,
      nombre: cliente.nombre,
      ape_paterno: cliente.ape_pat,
      ape_materno: cliente.ape_mat,
      email: cliente.email,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      celular: cliente.celular,
      departamento_id: cliente.departamento_id,
      provincia_id: cliente.provincia_id,
      distrito_id: cliente.distrito_id,
      // tipo_persona_id: cliente.tipo_persona_id,
      // department: null,
      // province: null,
      // district: null,
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
