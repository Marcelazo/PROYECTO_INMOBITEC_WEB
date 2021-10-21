import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FileSaverModule } from 'ngx-filesaver';
import { DepositPaymentRoutes } from './deposit-payment.routing';
import { DepositPaymentListComponent } from './pages/list/list.component';
import { DepositPaymentInfoComponent } from './shared/info/info.component';
import { MotiveDialogComponent } from './shared/motive-dialog/motive-dialog.component';

@NgModule({
  declarations: [
    DepositPaymentListComponent,
    DepositPaymentInfoComponent,
    MotiveDialogComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    FileSaverModule,
    RouterModule.forChild(DepositPaymentRoutes),
  ],
})
export class DepositPaymentModule {}
