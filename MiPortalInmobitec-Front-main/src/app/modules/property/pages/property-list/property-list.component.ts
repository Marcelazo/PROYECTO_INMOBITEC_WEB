import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { StateBadge } from 'src/app/interfaces/state-badge.interface';
import { PreSale, PRESALE_STATUSES } from 'src/app/models/pre-sale';
import { FormFilterService } from 'src/app/services/forms/form-filter.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  closeResult = '';
  searchText: any;

  originalPreSales: PreSale[] = [];
  preSales: PreSale[] = [];

  userStatuses: StateBadge[];

  @ViewChild('downloadFile')
  downloadFile!: ElementRef;

  constructor(
    public formFilter: FormFilterService,
    private preSaleService: PreSaleService,
    private fileSaverService: FileSaverService,
    private snackBar: SnackBarService
  ) {
    this.formFilter.clearData();

    this.userStatuses = PRESALE_STATUSES.filter((state) => state.id !== 0);
  }

  ngOnInit(): void {
    this.loadPreSales();
  }

  loadPreSales(): void {
    this.preSaleService.getAll().subscribe(
      (res: PreSale[]) => {
        this.preSales = res;
        this.originalPreSales = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  handleFilterProperties(): void {
    const { status, startDate, endDate } = this.formFilter.group.value;
    let filtered = this.originalPreSales.slice();
    if (status !== undefined && status !== null) {
      filtered = filtered.filter((item) => {
        return item.property?.estado === status.id;
      });
    }

    // Filtro Rango de Fechas
    if (startDate !== null || endDate !== null) {
      filtered = filtered.filter((item) => {
        if (item.fechaVenta) {
          const date = new Date(item.fechaVenta).getTime();
          if (startDate !== null && endDate === null) {
            const start = startDate?.toDate()?.getTime() ?? 0;
            return date >= start;
          }
          if (startDate !== null && endDate !== null) {
            const start = startDate?.toDate()?.getTime() ?? 0;
            const end = endDate?.toDate()?.getTime() ?? 0;
            return date >= start && date <= end;
          }
        }
        return false;
      });
    }

    this.preSales = filtered;
  }

  handleDownloadPdf(preSale: PreSale): void {
    preSale.downloadStatus = true;
    this.preSaleService.downloadPaymentSchedules(preSale?.id).subscribe(
      (res) => {
        this.fileSaverService.save(
          (res as any).body,
          this.getFileNamePdf(preSale)
        );
        // const a = this.downloadFile?.nativeElement;
        preSale.downloadStatus = false;
      },
      (err) => {
        const { error } = err;
        preSale.downloadStatus = false;
        this.snackBar.showMessage({
          type: 'error',
          title: 'Error!',
          description:
            error?.message ?? 'Ah ocurrido un error, intente nuevamente.',
        });
      }
    );
  }

  getFileNamePdf(preSale: PreSale): string {
    const property = preSale.property;
    const mz = property?.manzana ?? '';
    const lt = property?.lote ?? '';
    return `CRONOGRAMA_PAGOS_MZ-${mz}_LT-${lt}.pdf`;
  }

  handleClearFilterDates(e: MouseEvent): void {
    e.stopPropagation();
    this.formFilter.clearDates();
    this.handleFilterProperties();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
