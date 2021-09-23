import { Routes } from '@angular/router';
import { PaymentScheduleListComponent } from './pages/payment-schedule-list/payment-schedule-list.component';
import { FeePaymentFormComponent } from './pages/fee-payment-form/fee-payment-form.component';
import { ConfirmPaymentMarketComponent } from './pages/confirm-payment-market/confirm-payment-market.component';

export const PaymentScheduleRoutes: Routes = [
  {
    path: 'pagar',
    redirectTo: '/mis-inmuebles',
    pathMatch: 'full',
  },
  {
    path: ':preSaleId',
    component: PaymentScheduleListComponent,
    data: {
      title: 'Mis Cuotas',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Cuotas' }],
    },
  },
  {
    path: 'pagar/:paymentScheduleId',
    component: FeePaymentFormComponent,
    data: {
      title: 'Pagar Cuota',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Pago' }],
    },
  },
  // {
  //   path: 'validar-mercado-pago/:paymentScheduleId',
  //   component: ConfirmPaymentMarketComponent,
  //   data: {
  //     title: 'Mercado Pago',
  //     urls: [
  //       { title: 'Mis Inmuebles', url: '/mis-inmuebles' },
  //       { title: 'Mercado Pago' },
  //     ],
  //   },
  // },
];
