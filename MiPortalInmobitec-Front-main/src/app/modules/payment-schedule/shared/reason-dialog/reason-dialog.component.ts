import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentSchedule } from 'src/app/models/payment-schedule';

export interface SellerConfirmDialogData {
  paymentSchedule: PaymentSchedule;
}

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.scss'],
})
export class ReasonDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SellerConfirmDialogData,
    private dialogRef: MatDialogRef<ReasonDialogComponent>,
  ) {}

  ngOnInit(): void {}

  handleClickClose(): void {
    this.dialogRef?.close(this.data);
  }
}
