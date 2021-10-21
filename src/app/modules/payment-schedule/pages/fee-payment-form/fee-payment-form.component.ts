import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { FileSaverService } from 'ngx-filesaver';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { ParametersData } from 'src/app/interfaces/parameter.interface';
import { PaymentSchedule } from 'src/app/models/payment-schedule';
import { BankAccount } from 'src/app/models/bank-account';
import { PreSale } from 'src/app/models/pre-sale';
import { FeePaymentForm } from './fee-payment-form';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-fee-payment-form',
  templateUrl: './fee-payment-form.component.html',
  styleUrls: ['./fee-payment-form.component.scss'],
})
export class FeePaymentFormComponent implements OnInit {
  isEditing = false;
  isSubmit = false;

  paymentScheduleId: number | null = null;

  paymentSchedule: PaymentSchedule = Object.create(null);

  minDate: Date | null;
  maxDate: Date;

  bankAccounts: BankAccount[] = [];
  parameters: ParametersData = {
    transferType: [],
    transferBank: [],
    typeOperation: [],
  };
  showBankDetailsFields = false;

  file: File | null = null;
  showDownloadVoucher = false;
  downloadVoucherStatus = false;

  returnType: string | null = null;
  returnToUrl = '/mis-inmuebles';

  constructor(
    public form: FeePaymentForm,
    public auth: AuthService,
    private paymentScheduleService: PaymentScheduleService,
    private bankAccountService: BankAccountService,
    private parameterService: ParameterService,
    private fileSaverService: FileSaverService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form.reset();
    this.returnType = this.route.snapshot.queryParamMap.get('type');

    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setDate(1); // this.maxDate.getDate() - this.days
  }

  ngOnInit(): void {
    if (this.returnType === Role.admin) {
      this.minDate = null;
      this.returnToUrl = '/depositos-transferencias';
    }

    this.route.params.subscribe(
      (params: Params) => {
        if (Object.prototype.hasOwnProperty.call(params, 'paymentScheduleId')) {
          // tslint:disable-next-line: radix
          this.paymentScheduleId = parseInt(params.paymentScheduleId);
          this.getPaymentSchedule();
        } else {
          this.router.navigateByUrl(this.returnToUrl);
        }
      },
      (err) => {
        console.error(err);
        this.router.navigateByUrl(this.returnToUrl);
      }
    );
  }

  private getPaymentSchedule(): void {
    this.paymentScheduleService.get(this.paymentScheduleId as number).subscribe(
      (res: PaymentSchedule) => {
        this.paymentSchedule = res;

        this.form.group.patchValue({
          amount: res?.monto,
        });

        if (res.preSale instanceof PreSale) {
          this.getBankAccounts(res.preSale?.projectId);
          this.getParameters('transfer_type,transfer_bank,type_operation');
        }

        if (res.ticket !== null) {
          const ticket = res.ticket;
          this.isEditing = true;
          this.isSubmit = res.canUpdate;

          this.form.setErrorsToUpdate();
          this.form.group.patchValue({
            paymentMethod: 2,
            account: ticket?.ctaBancoId,
            transferType: `${ticket?.tipoTransferencia ?? 1}`,
            transferBank: ticket?.banco ?? null,
            typeOperation: ticket?.tipoOperacion
              ? `${ticket.tipoOperacion}`
              : null,
            operationNumber: ticket?.nroOpe,
            depositDate: ticket?.fechaDep,
            fileName: ticket?.voucher,
            reference: ticket?.referencia,
          });

          // Validate download voucher
          if (ticket?.tipoPagoId === 2 && ticket?.voucher) {
            this.showDownloadVoucher = true;
          }
        } else {
          this.isEditing = false;
          this.isSubmit = true;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private getBankAccounts(projectId: any): void {
    const bankId = env.bankAccount;
    this.bankAccountService.getAll(projectId, bankId).subscribe(
      (res: BankAccount[]) => {
        this.bankAccounts = res;

        if (this.bankAccounts.length === 1) {
          const [bankAccount] = this.bankAccounts;
          this.form.group.patchValue({
            account: bankAccount.id,
          });
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private getParameters(code: string): void {
    this.parameterService.grouped(code).subscribe(
      (res: ParametersData) => {
        this.parameters = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  handleChangeMode(val: string): void {
    switch (val) {
      case '1':
        this.showBankDetailsFields = false;
        this.form.group.patchValue({ transferBank: null, typeOperation: null });
        this.form.cleanErrorsToBankDetailsFields();
        break;
      case '2':
        this.showBankDetailsFields = true;
        this.form.setErrorsToBankDetailsFields();
        break;
    }
  }

  handleFileSelected(e: any): void {
    const files: FileList | null = e?.target?.files ?? null;
    if (files === undefined || files === null) {
      this.file = null;
      return;
    }

    this.file = files[0] as File;

    this.form.group.patchValue({
      fileName: this.file.name,
    });
  }

  handleSubmit(ngFrmPayment: NgForm): void {
    if (this.form.invalid || (this.file === null && this.isEditing === false)) {
      this.snackBar.showMessage({
        type: 'warning',
        title: 'Complete Campos!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const {
      account,
      transferType,
      transferBank,
      typeOperation,
      operationNumber,
      reference,
    } = this.form.group.value;

    if (transferType === '2' && transferBank === null) {
      this.snackBar.showMessage({
        type: 'warning',
        title: 'Complete Campos!',
        description: 'Seleccione el Banco de transfencia.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('cuota', `${this.paymentSchedule.id}`);
    formData.append('preventa', `${this.paymentSchedule?.preSale?.id}`);
    formData.append('monto', `${this.paymentSchedule.monto}`);
    formData.append('cta_banco', `${account}`);
    formData.append('nro_ope', `${operationNumber}`);
    formData.append('fecha_dep', this.form.depositDateFormated);
    formData.append('fecha_ope', this.form.today);

    formData.append('tipo_transferencia', `${transferType}`);
    formData.append('banco', `${transferBank ?? ''}`);
    formData.append('tipo_operacion', `${typeOperation ?? ''}`);
    formData.append('referencia', `${reference ?? ''}`);

    this.form.submiting();

    if (this.isEditing) {
      formData.append('ingreso', this.paymentSchedule.ticket?.id ?? '');
      if (this.file instanceof File) {
        formData.append('file', this.file as File);
      }

      this.updatePay(formData, ngFrmPayment);
    } else {
      formData.append('file', this.file as File);
      this.pay(formData, ngFrmPayment);
    }
  }

  downloadVoucher(): void {
    const fileName = this.paymentSchedule.ticket?.voucher ?? '';
    this.downloadVoucherStatus = true;
    this.paymentScheduleService.downloadVoucher(fileName).subscribe(
      (res) => {
        this.fileSaverService.save((res as any).body, fileName);
        this.downloadVoucherStatus = false;
      },
      (err: HttpErrorResponse) => {
        const { error } = err;
        this.downloadVoucherStatus = false;
        this.snackBar.showMessage({
          type: 'warning',
          title: '¡Error!',
          description: error?.message ?? 'Ah ocurrido un error..',
        });
      }
    );
  }

  private pay(formData: FormData, ngFrm: NgForm): void {
    this.paymentScheduleService.pay(formData).subscribe(
      (res: any) => {
        const { message } = res;
        ngFrm.resetForm();
        this.snackBar.showMessage(
          {
            type: 'success',
            title: '¡Exito!',
            description: message
              ? message
              : 'Se ha registrado correctamente el pago de la cuota.',
          },
          10000
        );

        this.form.defaultStatus();
        this.backToCuotasPage();
      },
      (err: HttpErrorResponse) => this.onError(err)
    );
  }

  private updatePay(formData: FormData, ngFrm: NgForm): void {
    this.paymentScheduleService.update(formData).subscribe(
      (res: any) => {
        const { message } = res;
        ngFrm.resetForm();
        this.snackBar.showMessage(
          {
            type: 'success',
            title: '¡Exito!',
            description: message
              ? message
              : 'Se ha actualizado correctamente el pago de la cuota.',
          },
          10000
        );

        this.form.defaultStatus();
        this.backToCuotasPage();
      },
      (err: HttpErrorResponse) => this.onError(err)
    );
  }

  private onError(err: HttpErrorResponse): void {
    const { error, status } = err;
    let message = 'Ah ocurrido un error, intente nuevamente mas tarde.';

    this.form.defaultStatus();

    switch (status) {
      case StatusCodes.BAD_REQUEST:
      case StatusCodes.UNAUTHORIZED:
        message = error?.message ?? message;
        break;
    }

    this.snackBar.showMessage({
      type: 'error',
      title: '¡Error!',
      description: message,
    });
  }

  backToCuotasPage(): void {
    const url =
      this.returnType === 'admin'
        ? this.returnToUrl
        : `/cuotas/${this.paymentSchedule?.preSale?.id ?? ''}`;
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 500);
  }
}
