import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { CellPhoneValidator } from 'src/app/validators/validators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    name: {
      required: 'Los nombres es requerido',
    },
    fatherSurname: {
      required: 'El apellido paterno es requerido',
    },
    motherSurname: {
      required: 'EL apellido materno es requerido',
    },
    documentType: {
      required: 'Seleccione tipo de documento',
    },
    document: {
      required: 'El documento es requerido',
      minlength: 'El documento debe tener 8 dígitos',
      maxlength: 'El documento debe tener 20 dígitos',
      exists: 'El número de documento ya existe',
    },
    cellphone: {
      required: 'El número celular es requerido',
      minlength: 'El número celular debe tener 9 dígitos',
      maxlength: 'El número celular debe tener 9 dígitos',
      notCellPhone: 'El número celular es inválido',
      exists: 'El número celular ya existe',
    },
    email: {
      required: 'El correo electrónico son requerido',
      email: 'El correo electrónico es invalido',
      exists: 'El correo electrónico ya esta registrado',
    },
    civilStatus: {
      required: 'El campo es requerido',
    },
    address: {
      required: 'La dirección es requerido',
    },
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.defaultStatus();
  }

  private createForm(): void {
    this.group = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        fatherSurname: [null, [Validators.required]],
        motherSurname: [null, [Validators.required]],
        documentType: [null, [Validators.required]],
        document: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        cellphone: [
          null,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        email: [null, [Validators.email]],
        civilStatus: [null, [Validators.required]],
        address: [null, [Validators.required]],
        // phone: [null],
        // employee: [null],
      },
      {
        validators: [CellPhoneValidator('cellphone')],
      }
    );
  }

  /**
   * Set data provider
   */
  setData(data: User): void {
    this.group.patchValue({
      name: data.name,
      fatherSurname: data.fatherSurname,
      motherSurname: data.motherSurname,
      documentType: data.documentType?.id ?? null,
      document: data.document,
      cellphone: data.cellphone,
      email: data.email,
      civilStatus: data.civilStatus,
      address: data.address,
    });
    this.isEditing = data?.id !== '' ? true : false;
    this.defaultStatus();
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

  get name(): any {
    return this.group.get('name');
  }

  get fatherSurname(): any {
    return this.group.get('fatherSurname');
  }

  get motherSurname(): any {
    return this.group.get('motherSurname');
  }

  get documentType(): any {
    return this.group.get('documentType');
  }

  get document(): any {
    return this.group.get('document');
  }

  get cellphone(): any {
    return this.group.get('cellphone');
  }

  get email(): any {
    return this.group.get('email');
  }

  get civilStatus(): any {
    return this.group.get('civilStatus');
  }

  get address(): any {
    return this.group.get('address');
  }
}
