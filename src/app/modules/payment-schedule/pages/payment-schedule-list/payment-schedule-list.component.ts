import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
// import Echo from 'laravel-echo';

import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { FormFilterService } from 'src/app/services/forms/form-filter.service';
import { StateBadge } from 'src/app/interfaces/state-badge.interface';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { PreSale } from 'src/app/models/pre-sale';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';
import { PaymentSchedule, STATE_BADGES } from 'src/app/models/payment-schedule';
import { PaymentMethodDialogComponent } from '../../shared/payment-method-dialog/payment-method-dialog.component';
import { ReasonDialogComponent } from '../../shared/reason-dialog/reason-dialog.component';
// import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-payment-schedule-list',
  templateUrl: './payment-schedule-list.component.html',
  styleUrls: ['./payment-schedule-list.component.scss'],
})
export class PaymentScheduleListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'amount',
    'state',
    'ticketCode',
    'actions',
  ];

  dataSource: MatTableDataSource<PaymentSchedule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  states: StateBadge[];

  preSaleId: string | null;
  preSale: PreSale | null = null;

  paymentSchedules: PaymentSchedule[] = [];

  // Status
  payStatus = false;

  constructor(
    public formFilter: FormFilterService,
    private preSaleService: PreSaleService,
    private paymentScheduleService: PaymentScheduleService,
    // private wsLiveService: WsLiveService,
    private fileSaverService: FileSaverService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.formFilter.clearData();
    this.states = STATE_BADGES;
    this.dataSource = new MatTableDataSource<PaymentSchedule>([]);
    this.preSaleId = this.route.snapshot.paramMap.get('preSaleId');
  }

  ngOnInit(): void {
    this.loadPreSale();
    // this.startLive();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Start Websocket
   */
  private startLive(): void {
    // const protocol = window.location.protocol.replace('http', 'ws');
    // const host = window.location.host;
    // const host = 'portal-inmobitec-api.com';
    // const echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: env.pusherAppKey,
    //   cluster: env.pusherAppCluster,
    //   wsHost: host,
    //   wsPort: 6001,
    //   wssPort: 6001,
    //   disableStats: true,
    //   encrypted: true,
    //   enabledTransports: ['ws'],
    //   forceTLS: false,
    // });
    // echo.channel('paymentSchedules').listen('.validatedPayment', (res: any) => {
    //   console.log(res);
    // });
    // echo.disconnect();
    // this.wsLiveService.init().subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
  }

  /**
   * Obteniendo Pre Ventas
   */
  private loadPreSale(): void {
    this.preSaleService.get(this.preSaleId as string).subscribe(
      (res: PreSale) => {
        this.preSale = res;
        this.getPaymentSchedules();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * Obteniendo Cuotas
   */
  private getPaymentSchedules(): void {
    this.paymentScheduleService.getAll(this.preSaleId as string).subscribe(
      (list: PaymentSchedule[]) => {
        let hasPay = false;
        const hasAnyInProcess = list
          .map<boolean>((payment) => payment.isToReview || payment.isInProcess)
          .reduce((previous, current) => {
            return current ? current : previous;
          });

        this.paymentSchedules = list;
        if (!hasAnyInProcess) {
          this.paymentSchedules.map((payment) => {
            if (!hasPay) {
              hasPay = payment.updateCanPay();
            }

            return payment;
          });
        }

        this.dataSource.data = this.paymentSchedules.slice();
        this.dataSource._updateChangeSubscription();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  handleFilterList(): void {
    const { status, startDate, endDate } = this.formFilter.group.value;
    let filtered = this.paymentSchedules.slice();
    if (status !== undefined && status !== null) {
      filtered = filtered.filter((item) => {
        return item.estado === status.id;
      });
    }
    // Filtro Rango de Fechas
    if (startDate !== null || endDate !== null) {
      filtered = filtered.filter((value) => {
        const date = new Date(value.fechaPago).getTime();
        if (startDate !== null && endDate === null) {
          const start = startDate?.toDate()?.getTime() ?? 0;
          return date >= start;
        }
        if (startDate !== null && endDate !== null) {
          const start = startDate?.toDate()?.getTime() ?? 0;
          const end = endDate?.toDate()?.getTime() ?? 0;
          return date >= start && date <= end;
        }
        return false;
      });
    }

    this.dataSource.data = filtered;
    this.dataSource._updateChangeSubscription();
  }

  handleShowReason(data: PaymentSchedule): void {
    this.dialog.open(ReasonDialogComponent, {
      maxWidth: '680px',
      disableClose: true,
      data: {
        paymentSchedule: data,
      },
    });
  }

  handleClickPay(data: PaymentSchedule): void {
    this.payStatus = true;

    const dialogRef = this.dialog.open(PaymentMethodDialogComponent, {
      disableClose: true,
      data: {
        paymentSchedule: data,
        preSale: this.preSale,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.payStatus = false;
    });
  }

  downloadTicket(data: PaymentSchedule): void {
    data.downloadStatus = true;
    this.paymentScheduleService.downloadTicket(data.id).subscribe(
      (res: any) => {
        data.downloadStatus = false;
        this.fileSaverService.save((res as any).body, data.invoiceName);
      },
      (err: HttpErrorResponse) => {
        const { error } = err;
        console.log(error);

        data.downloadStatus = false;
        this.snackBar.showMessage({
          type: 'warning',
          title: '¡Error!',
          description:
            error?.message ??
            'Ah ocurrido un error, intente nuevamente más tarde.',
        });
      }
    );
  }

  handleClearFilterDates(e: MouseEvent): void {
    e.stopPropagation();
    this.formFilter.clearDates();
    this.handleFilterList();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
