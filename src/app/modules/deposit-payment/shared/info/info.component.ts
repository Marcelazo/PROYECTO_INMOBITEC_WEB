import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  IParameter,
  ParametersData,
} from 'src/app/interfaces/parameter.interface';
import { PaymentSchedule } from 'src/app/models/payment-schedule';

interface DepositPaymentInfoData {
  paymentSchedule: PaymentSchedule;
  parameters: { [key: string]: IParameter[] };
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class DepositPaymentInfoComponent implements OnInit {
  paymentSchedule: PaymentSchedule;
  parameters: { [key: string]: IParameter[] };

  transferType = '';
  transferBank = '';
  typeOperation = '';

  constructor(
    private dialogRef: MatDialogRef<DepositPaymentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepositPaymentInfoData
  ) {
    this.paymentSchedule = this.data.paymentSchedule;
    this.parameters = this.data.parameters;
  }

  ngOnInit(): void {
    const {
      tipoTransferencia,
      banco,
      tipoOperacion,
    } = this.paymentSchedule.ticket;

    this.transferType = this.description('transferType', tipoTransferencia);
    this.transferBank = this.description('transferBank', banco);
    this.typeOperation = this.description('typeOperation', tipoOperacion);
  }

  /**
   * Parameter decription
   */
  private description(key: any, id: any): string {
    let desc = '';
    if (Object.prototype.hasOwnProperty.call(this.parameters, key)) {
      const list = this.parameters[key];
      const parameter = list.find((value) => value.string1 === `${id ?? ''}`);
      desc = parameter ? parameter.descripcion : '';
    }

    return desc;
  }

  handleClickClose(): void {
    this.dialogRef?.close(this.data);
  }
}
