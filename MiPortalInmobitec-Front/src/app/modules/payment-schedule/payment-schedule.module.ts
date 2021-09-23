import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PaymentScheduleRoutes } from './payment-schedule.routing';
import { PaymentScheduleListComponent } from './pages/payment-schedule-list/payment-schedule-list.component';
import { FeePaymentFormComponent } from './pages/fee-payment-form/fee-payment-form.component';
import { PaymentMethodDialogComponent } from './shared/payment-method-dialog/payment-method-dialog.component';
import { ReasonDialogComponent } from './shared/reason-dialog/reason-dialog.component';
import { ConfirmPaymentMarketComponent } from './pages/confirm-payment-market/confirm-payment-market.component';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [
    PaymentScheduleListComponent,
    FeePaymentFormComponent,
    PaymentMethodDialogComponent,
    ReasonDialogComponent,
    ConfirmPaymentMarketComponent,
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
    RouterModule.forChild(PaymentScheduleRoutes),
  ],
})
export class PaymentScheduleModule {}
