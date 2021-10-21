import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentScheduleService } from 'src/app/services/payment-schedule.service';
import { PreSaleService } from 'src/app/services/pre-sale.service';
import { NotificationDialogComponent } from '../../shared/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  total = 0;
  innerWidth = 0;

  showPropertiesCard: boolean;
  showDepositCard: boolean;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private preSaleService: PreSaleService,
    private paymentScheduleService: PaymentScheduleService
  ) {
    this.showPropertiesCard = this.auth.hasRole(Role.user);
    this.showDepositCard = this.auth.hasRole(Role.admin);
  }

  ngOnInit(): void {
    this.innerWidth = Math.max(
      window.innerWidth || 0,
      document.documentElement.clientWidth || 0
    );

    if (this.showPropertiesCard) {
      this.getTotalProperties();
    }

    if (this.showDepositCard) {
      this.getTotalDeposits();
    }
  }

  ngAfterViewInit(): void {
    if (this.showPropertiesCard) {
      setTimeout(() => {
        this.openDialog();
      }, 1500);
    }
  }

  private getTotalProperties(): void {
    this.preSaleService.total().subscribe((res: any) => {
      this.total = res?.total ?? 0;
    });
  }

  private getTotalDeposits(): void {
    this.paymentScheduleService.totalDeposits().subscribe((res: any) => {
      this.total = res?.total ?? 0;
    });
  }

  private openDialog(): void {
    let width = '680px';
    let maxWidth = '80vw';
    if (this.innerWidth < 680) {
      width = '90%';
      maxWidth = '90vw';
    }

    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width,
      maxWidth,
      disableClose: true,
      position: {
        top: '120px',
      },
      data: {
        title: 'Aviso Importante',
        description: 'Si eres cliente de Inmobitec 😉',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
