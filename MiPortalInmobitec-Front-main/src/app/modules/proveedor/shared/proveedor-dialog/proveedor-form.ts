import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { Proveedor } from 'src/app/models/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    ruc: {
      required: 'El Ruc es requerido',
      minlength: 'El Ruc debe tener 11 dígitos',
      maxlength: 'El Ruc debe tener 11 dígitos',
      exists: 'El Ruc ya existe',
    },
    nombre: {
      required: 'El nombre es requerido',
    },
    giro: {
      required: 'El nombre es requerido',
    },
    sigla: {
      required: 'El nombre es requerido',
    },
    direccion: {
      required: 'La direccion es requerida',
    },
    telefono: {
      required: 'El teléfono es requerido',
      minlength: 'El teléfono debe tener al menos 6 dígitos',
       maxlength: 'El teléfono debe tener máximo 12 dígitos',
    },
    zip: {
      required: 'La direccion es requerida',
    },
    email: {
      required: 'El correo electrónico son requerido',
      email: 'El correo electrónico es invalido',
      exists: 'El correo electrónico ya esta registrado',
    },
    estado: {
      required: 'La direccion es requerida',
    },
    departamento_id: {
      required: 'El campo es requerido',
    },
    provincia_id: {
      required: 'El campo es requerido',
    },
    distrito_id: {
      required: 'El campo es requerido',
    },
    tipo_identificacion_id: {
      required: 'El campo es requerido',
    },
    tipo_persona_id: {
      required: 'El campo es requerido',
    },
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
        ruc: [
          null,
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
          ],
        ],
        nombre: [null, Validators.required],
        giro: [null, Validators.required],
        sigla: [null, Validators.required],
        direccion: [null, Validators.required],
        telefono: [
          null,[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ]
        ],
        zip: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        departamento_id: [null, Validators.required],
        provincia_id: [null, Validators.required],
        distrito_id: [null, Validators.required],
        tipo_persona_id: [null, Validators.required],
        tipo_identificacion_id: [null, Validators.required],
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

  set data(proveedor: Proveedor) {
    this.group.patchValue({
      ruc: proveedor.ruc,
      nombre: proveedor.nombre,
      giro: proveedor.giro,
      sigla: proveedor.sigla,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      zip: proveedor.zip,
      email: proveedor.email,
      departamento_id: proveedor.departamento_id,
      provincia_id: proveedor.provincia_id,
      distrito_id: proveedor.distrito_id,
      tipo_identificacion_id: proveedor.tipo_identificacion_id,
      tipo_persona_id: proveedor.tipo_persona_id,
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
