import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentSchedule } from 'src/app/models/payment-schedule';

interface MotiveDialogData {
  paymentSchedule: PaymentSchedule;
}

@Component({
  selector: 'app-motive-dialog',
  templateUrl: './motive-dialog.component.html',
  styleUrls: ['./motive-dialog.component.scss'],
})
export class MotiveDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<MotiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MotiveDialogData
  ) {}

  ngOnInit(): void {}

  handleClickClose(): void {
    this.dialogRef?.close(this.data);
  }
}
