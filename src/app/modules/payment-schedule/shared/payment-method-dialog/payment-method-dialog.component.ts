import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';
import { PaymentSchedule } from 'src/app/models/payment-schedule';
import { PreSale } from 'src/app/models/pre-sale';
import { environment as env } from 'src/environments/environment';

export interface SellerConfirmDialogData {
  paymentSchedule: PaymentSchedule;
  preSale: PreSale;
}

export interface PaidMarket {
  quantity: number;
  price: string;
  description: string;
}

@Component({
  selector: 'app-payment-method-dialog',
  templateUrl: './payment-method-dialog.component.html',
  styleUrls: ['./payment-method-dialog.component.scss'],
})
export class PaymentMethodDialogComponent implements OnInit {
  title = 'Método de Pago';

  paymentMethodShow = true;
  paidMarketStatus = false;
  paidMarketShow = false;

  paidMarket: PaidMarket | null = null;

  @ViewChild('buttonCheckout')
  private buttonCheckoutRef!: ElementRef;

  constructor(
    private paymentSheduleService: PaymentScheduleService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialogRef: MatDialogRef<PaymentMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SellerConfirmDialogData
  ) {}

  ngOnInit(): void {}

  payByDepositOrTransfer(): void {
    this.handleClickClose();
    setTimeout(() => {
      const url = `/cuotas/pagar/${this.data.paymentSchedule.id}`;
      this.router.navigateByUrl(url);
    }, 100);
  }

  payWithMercadoPago(): void {
    this.paidMarketStatus = true;
    const data = {
      preSale: this.data.preSale.id,
      paymentSchedule: this.data.paymentSchedule.id,
      description: this.paymentDescription,
    };

    this.paymentSheduleService.generatePreference(data).subscribe(
      (res: any) => {
        const { id, item } = res;
        this.paidMarket = {
          quantity: item.quantity,
          price: `${item.price}`,
          // price: '5',
          description: this.paymentDescription,
        };

        this.createCheckoutButton(id);
        this.paidMarketStatus = false;
      },
      (err: any) => {
        this.paidMarketStatus = false;
        const error = err.error;
        const description = error?.message
          ? error
          : 'Ah ocurrido un error, intente nuevamente mas tarde.';

        this.snackBar.showMessage({
          type: 'warning',
          title: '¡Error!',
          description,
        });
      }
    );
  }

  handleClickClose(): void {
    if (!this.paymentMethodShow) {
      this.paymentMethodShow = true;
      this.paidMarketShow = false;
    } else {
      this.dialogRef?.close(this.data);
    }
  }

  private createCheckoutButton(preference: string): void {
    const script = document.createElement('script');
    const el = this.buttonCheckoutRef.nativeElement;

    script.src = env.webPaymentCheckoutJS;
    script.type = 'text/javascript';
    script.dataset.preferenceId = preference;

    el.innerHTML = '';
    el.appendChild(script);
    this.paymentMethodShow = false;
    this.paidMarketShow = true;
  }

  get paymentDescription(): string {
    const { paymentSchedule, preSale } = this.data;
    const cuota = paymentSchedule.nroCuota;
    const mz = preSale.property.manzana || '';
    const lt = preSale.property.lote || '';
    const proyecto = preSale.project.nombre || '';
    return `Cuota N° ${cuota} de la MZ ${mz} LT ${lt} - ${proyecto}`;
  }
}
