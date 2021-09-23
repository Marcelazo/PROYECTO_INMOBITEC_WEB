import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private preSaleService: PreSaleService
  ) {}

  ngOnInit(): void {
    this.innerWidth = Math.max(
      window.innerWidth || 0,
      document.documentElement.clientWidth || 0
    );

    this.getTotalProperties();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.openDialog();
    // }, 1500);
  }

  private getTotalProperties(): void {
    this.preSaleService.total().subscribe((res: any) => {
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
      position: {
        top: '120px',
      },
      data: {
        title: 'Title',
        description: 'Description',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
