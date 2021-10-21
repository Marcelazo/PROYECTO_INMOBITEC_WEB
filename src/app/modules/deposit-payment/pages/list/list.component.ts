import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { isMoment } from 'moment';
import { FileSaverService } from 'ngx-filesaver';

import { ParametersData } from 'src/app/interfaces/parameter.interface';
import { StateBadge } from 'src/app/interfaces/state-badge.interface';
import { PaymentSchedule, STATE_BADGES } from 'src/app/models/payment-schedule';
import { DepositPaymentService } from 'src/app/services/deposit-payment.service';
import { FormFilterService } from 'src/app/services/forms/form-filter.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ParameterService } from 'src/app/services/parameter.service';
import { PropertyService } from 'src/app/services/property.service';
import { DepositPaymentInfoComponent } from '../../shared/info/info.component';
import { MotiveDialogComponent } from '../../shared/motive-dialog/motive-dialog.component';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';

@Component({
  selector: 'app-deposit-payment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class DepositPaymentListComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  displayedColumns: string[] = [
    'id',
    'document',
    'customer',
    'property',
    'fee',
    'date',
    'state',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Mat Paginator
  resultsLength = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  paymentSchedules: PaymentSchedule[] = [];
  mzs: any[] = [];
  lts: any[] = [];
  states: StateBadge[];

  payStatus = false;
  innerWidth = 0;

  private lastParams: any = {};
  parameters: ParametersData = {
    transferType: [],
    transferBank: [],
    typeOperation: [],
  };

  constructor(
    public formFilter: FormFilterService,
    private depositPaymentService: DepositPaymentService,
    private paymentScheduleService: PaymentScheduleService,
    private propertyService: PropertyService,
    private parameterService: ParameterService,
    private fileSaverService: FileSaverService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formFilter.clearData();
    this.states = STATE_BADGES.slice().filter(
      (value) => ![0, 5].includes(value.id)
    );
  }

  ngOnInit(): void {
    this.innerWidth = Math.max(
      window.innerWidth || 0,
      document.documentElement.clientWidth || 0
    );

    this.getMzs();
    this.getParameters('transfer_type,transfer_bank,type_operation');
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const filters = this.filterParameters;
          this.isLoadingResults = true;
          this.lastParams = filters;
          const params = {
            page: this.paginator.pageIndex + 1,
            pageSize: this.paginator.pageSize,
            sort: this.sort.active ?? '',
            direction: this.sort.direction ?? '',
            ...filters,
          };

          return this.depositPaymentService.allPaginate(params);
        }),
        map((res) => {
          this.isLoadingResults = false;
          this.resultsLength = res.total;

          return res.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.paymentSchedules = data));
  }

  private getMzs(): void {
    this.propertyService.mzs().subscribe((res) => {
      console.log(res);
    });
  }

  private searchData(data = {}): void {
    this.isLoadingResults = true;
    this.lastParams = data;
    const params = {
      page: this.paginator.pageIndex + 1,
      sort: this.sort.active ?? '',
      direction: this.sort.direction ?? '',
      ...data,
    };

    this.depositPaymentService
      .allPaginate(params)
      .pipe(
        map((res) => {
          this.isLoadingResults = false;
          this.resultsLength = res.total;
          return res.data as PaymentSchedule[];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.paymentSchedules = data));
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

  handleShowInfo(data: PaymentSchedule): void {
    const config = this.modalDimensions(680);
    this.dialog.open(DepositPaymentInfoComponent, {
      ...config,
      disableClose: true,
      data: {
        paymentSchedule: data,
        parameters: this.parameters,
      },
    });
  }

  handleShowReason(data: PaymentSchedule): void {
    const config = this.modalDimensions(680);
    this.dialog.open(MotiveDialogComponent, {
      ...config,
      disableClose: true,
      data: {
        paymentSchedule: data,
      },
    });
  }

  goToPaymentForm(data: PaymentSchedule): void {
    const url = `/cuotas/pagar/${data.id}?type=admin`;
    this.router.navigateByUrl(url);
  }

  downloadTicket(data: PaymentSchedule): void {
    data.downloadStatus = true;
    this.paymentScheduleService.downloadTicket(data.id).subscribe(
      (res: any) => {
        data.downloadStatus = false;
        this.fileSaverService.save((res as any).body, data.invoiceName);
      },
      (err) => {
        const { error } = err;
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

  handleFilterState(): void {
    this.searchData(this.filterParameters);
  }

  handleFilterDate(): void {
    const data = this.filterParameters;
    if (JSON.stringify(data) !== JSON.stringify(this.lastParams)) {
      this.searchData(data);
    }
  }

  handleClearFilterDates(e: MouseEvent): void {
    e.stopPropagation();
    this.formFilter.clearDates();
    this.searchData(this.filterParameters);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  customerFullName(data: PaymentSchedule): string {
    const customer: any = data.preSale?.customer;
    const { nombre, apePat, apeMat } = customer;
    const fullName = `${nombre ?? ''} ${apePat ?? ''} ${apeMat ?? ''}`.trim();

    return fullName.length >= 40 ? `${fullName.substring(0, 37)}...` : fullName;
  }

  modalDimensions(withInPixels: number): { [key: string]: any } {
    let width = `${withInPixels}px`;
    let maxWidth = '80vw';
    if (this.innerWidth < withInPixels) {
      width = '90%';
      maxWidth = '90vw';
    }

    return {
      width,
      maxWidth,
    };
  }

  get filterParameters(): { [key: string]: any } {
    // tslint:disable-next-line: prefer-const
    let { status, startDate, endDate, search } = this.formFilter.group.value;

    if (isMoment(startDate)) {
      startDate = startDate.format('YYYY-MM-DD');
    }

    if (isMoment(endDate)) {
      endDate = endDate.format('YYYY-MM-DD');
    }

    return {
      state: status?.id || '',
      'date-from': startDate || '',
      'date-to': endDate || '',
      search: search || '',
    };
  }
}
