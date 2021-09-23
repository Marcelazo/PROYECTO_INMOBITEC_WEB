import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormErrors } from 'src/app/interfaces/forms.interface';

export interface FormFilterServiceState {
  error: boolean;
  message: string;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormFilterService {
  group: FormGroup = Object.create(null);
  state: FormFilterServiceState = Object.create(null);
  private errors: FormErrors = {
    supplier: {
      required: 'El campo es requerido',
    },
    status: {
      required: 'El campo es requerido',
    },
    startDate: {
      required: 'El campo es requerido',
    },
    endDate: {
      required: 'El campo es requerido',
    },
    date: {
      required: 'El campo es requerido',
    },
    search: {
      required: 'El campo es requerido',
    },
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.defaultStatus();
  }

  private createForm(): void {
    this.group = this.formBuilder.group({
      supplier: [null],
      status: [null],
      startDate: [null],
      endDate: [null],
      date: [null],
      search: [null],
    });
  }

  /**
   * Set data group
   */
  setData(data: any): void {
    this.group.patchValue(data);
    this.defaultStatus();
  }

  /**
   * Clear form data
   */
  clearData(): void {
    this.group.patchValue({
      supplier: null,
      status: null,
      startDate: null,
      endDate: null,
      date: null,
      search: null,
    });
    this.defaultStatus();
  }

  clearDates(): void {
    this.group.patchValue({
      startDate: null,
      endDate: null,
      date: null,
    });
    this.defaultStatus();
  }

  defaultStatus(): void {
    this.state = {
      error: false,
      message: '',
      loading: false,
    };
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

  get filledAnyDates(): boolean {
    return this.startDate?.value !== null || this.endDate?.value !== null;
  }

  get dateFormated(): string {
    const val: any = this.date.value;
    if (typeof val === 'string') {
      return val;
    }

    return val ? val.format('YYYY-MM-DD') : null;
  }

  get supplier(): any {
    return this.group.get('supplier');
  }

  get status(): any {
    return this.group.get('status');
  }

  get startDate(): any {
    return this.group.get('startDate');
  }

  get endDate(): any {
    return this.group.get('endDate');
  }

  get date(): any {
    return this.group.get('date');
  }

  get search(): any {
    return this.group.get('search');
  }
}
