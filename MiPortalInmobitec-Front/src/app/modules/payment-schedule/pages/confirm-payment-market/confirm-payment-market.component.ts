import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaymentMarketResponse } from 'src/app/models/payment-market-response';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';

@Component({
  selector: 'app-confirm-payment-market',
  templateUrl: './confirm-payment-market.component.html',
  styleUrls: ['./confirm-payment-market.component.scss'],
})
export class ConfirmPaymentMarketComponent implements OnInit {
  paymentScheduleId: number | null = null;

  status = '';
  description = '';

  constructor(
    private paymentSheduleService: PaymentScheduleService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('paymentScheduleId');
    // tslint:disable-next-line: radix
    this.paymentScheduleId = parseInt(id ?? '0');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        if (this.paymentScheduleId) {
          const data: any = {
            payment_schedule_id: this.paymentScheduleId,
            ...queryParams,
          };

          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              const param = data[key];
              data[key] = param === 'null' ? null : param;
            }
          }

          const response = new PaymentMarketResponse(data);
          this.confirmPaymentMarket(response);
        } else {
          this.router.navigateByUrl('/mis-inmuebles');
        }
      },
      (err) => {
        console.error(err);
        this.router.navigateByUrl('/mis-inmuebles');
      }
    );
  }

  /**
   * Confirm payment market
   */
  private confirmPaymentMarket(response: PaymentMarketResponse): void {
    console.log(response);

    this.paymentSheduleService.approvePayment(response.toJson()).subscribe(
      (res: any) => {
        console.log(res);
        this.status = res?.status ?? 'Status';
        this.description = res?.message ?? 'Message';
      },
      (err: HttpErrorResponse) => {
        const { error, status } = err;
        console.error(err);

        switch (status) {
          case 404:
            this.description = 'Es posible que su pago ya fue validado';
            break;
          default:
            break;
        }

        this.snackBar.showMessage({
          type: 'warning',
          title: '¡Error!',
          description:
            error?.message ??
            'Ah ocurrido un error, intente nuevamente mas tarde.',
        });
      }
    );
  }
}
