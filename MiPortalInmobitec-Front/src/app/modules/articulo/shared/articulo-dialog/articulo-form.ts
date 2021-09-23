 import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import { Articulo } from 'src/app/models/articulo';


@Injectable({
  providedIn: 'root',
})
export class ArticuloForm {
  isEditing = false;
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    codigo: {required:'El Código es requerido',},
    descripcion: {required:'La Descripción es requerido',},
    observacion: {required:'La Observación es requerido',},
    valor_costo: {required:'El P. Costo es requerido',},
    valor_venta: {required:'El P. Venta es requerido',},
    modelo: {required:'El Modelo es requerido',},
    tamaño: {required:'El Tamaño es requerido',},
    color: {required:'El Color es requerido',},
    familia_id: {required:'La Familia es requerido',},
    clase_id: {required:'La Clase es requerido',},
    grupo_id: {required:'El Grupo es requerido',},
    marca_id: {required:'La Marca es requerido',},
    unidadMedida_id: {required:'La Unidad de Medida es requerido',},
    tipoMoneda_id: {required:'El Tipo de Moneda es requerido',},
    peso_neto: {required:'El Peso Neto es requerido',},
    peso_envase: {required:'El Peso Envase es requerido',},
    peso_bruto: {required:'El Peso Bru es requerido',},
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

        codigo: [null, Validators.required],
        descripcion: [null, Validators.required],
        observacion: [null, Validators.required],
        valor_costo: [null, Validators.required],
        valor_venta: [null, Validators.required],
        modelo: [null, Validators.required],
        tamaño: [null, Validators.required],
        color: [null, Validators.required],
        familia_id: [null, Validators.required],
        clase_id: [null, Validators.required],
        grupo_id: [null, Validators.required],
        marca_id: [null, Validators.required],
        unidadMedida_id: [null, Validators.required],
        tipoMoneda_id: [null, Validators.required],
        peso_neto: [null, Validators.required],
        peso_envase: [null, Validators.required],
        peso_bruto: [null, Validators.required],

      },

    );
  }

  set data(cliente: Articulo) {
    this.group.patchValue({
      codigo: cliente.codigo,
      descripcion: cliente.descripcion,
      observacion: cliente.observacion,
      valor_costo: cliente.valor_costo,
      valor_venta: cliente.valor_venta,
      modelo: cliente.modelo,
      tamaño: cliente.tamaño,
      color: cliente.color,
      familia_id: cliente.familia_id,
      clase_id: cliente.clase_id,
      grupo_id: cliente.grupo_id,
      marca_id: cliente.marca_id,
      unidadMedida_id: cliente.unidadMedida_id,
      tipoMoneda_id: cliente.tipoMoneda_id,
      peso_neto: cliente.peso_neto,
      peso_envase: cliente.peso_envase,
      peso_bruto: cliente.peso_bruto,
      department: null,
      province: null,
      district: null,
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
