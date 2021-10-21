import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrors, FormState } from 'src/app/interfaces/forms.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FeePaymentForm {
  group: FormGroup = Object.create(null);
  state: FormState = Object.create(null);
  private errors: FormErrors = {
    paymentMethod: {
      required: 'Método de pago es requerido',
    },
    amount: {
      required: 'El monto es requerido',
    },
    account: {
      required: 'La cuenta de banco es requerido',
    },
    transferType: {
      required: 'Tipo de transferencia es requerido',
    },
    transferBank: {
      required: 'El banco es requerido',
    },
    typeOperation: {
      required: 'Tipo de operación es requerido',
    },
    operationNumber: {
      required: 'Número de operación es requerido',
      minlength: 'Número debe ser mas de 2 dígitos',
    },
    depositDate: {
      required: 'Fecha de depósito es requerido',
      matDatepickerMin: 'Fecha de depósito es inválido',
    },
    fileName: {
      required: 'El voucher es requerido',
    },
    fileInput: {
      required: 'El voucher es requerido',
    },
    reference: {
      required: 'La referencia es requerido',
    },
  };

  constructor(private formBuilder: FormBuilder) {
    this.defaultStatus();
    this.createForm();
  }

  createForm(): void {
    this.group = this.formBuilder.group({
      paymentMethod: new FormControl(
        { value: 2, disabled: true },
        Validators.required
      ),
      amount: new FormControl(null, Validators.required),
      account: [null, Validators.required],
      transferType: [1, Validators.required],
      transferBank: [null],
      typeOperation: [null],
      operationNumber: [null, [Validators.required, Validators.minLength(2)]],
      depositDate: [null, Validators.required],
      fileName: [null, Validators.required],
      fileInput: [null, Validators.required],
      reference: [null, Validators.required],
    });
  }

  get data(): any {
    return null;
  }

  reset(): void {
    this.group.patchValue({
      paymentMethod: 2,
      account: null,
      transferType: '1',
      transferBank: null,
      typeOperation: null,
      operationNumber: null,
      depositDate: null,
      fileName: null,
      fileInput: null,
      reference: null,
    });
  }

  defaultStatus(): void {
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

  setErrorsToUpdate(): void {
    this.group.get('fileName')?.setErrors(null);
    this.group.get('fileInput')?.setErrors(null);
  }

  /**
   * Agregar valicaciones para los campos de detalles de banco
   */
  setErrorsToBankDetailsFields(): void {
    const { transferBank, typeOperation } = this.group.controls;
    transferBank.setErrors(Validators.required);
    typeOperation.setErrors(Validators.required);
  }

  /**
   * Limpiar valicaciones para los campos de detalles de banco
   */
  cleanErrorsToBankDetailsFields(): void {
    const { transferBank, typeOperation } = this.group.controls;
    transferBank.setErrors(null);
    typeOperation.setErrors(null);
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

  get today(): string {
    return moment().format('DD/MM/YYYY');
  }

  get depositDateFormated(): string {
    const { depositDate } = this.group?.value;
    if (typeof depositDate === 'string' && depositDate.trim() !== '') {
      const momentDate = moment(depositDate);
      return momentDate.format('DD/MM/YYYY');
    }

    return depositDate ? depositDate.format('DD/MM/YYYY') : '';
  }
}
