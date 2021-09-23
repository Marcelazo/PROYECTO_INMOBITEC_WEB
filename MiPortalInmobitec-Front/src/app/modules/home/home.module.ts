import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './home.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotificationDialogComponent } from './shared/notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [DashboardComponent, NotificationDialogComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(HomeRoutes),
  ],
})
export class HomeModule {}
