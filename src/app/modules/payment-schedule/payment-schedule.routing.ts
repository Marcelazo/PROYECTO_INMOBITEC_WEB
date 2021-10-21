import { Routes } from '@angular/router';
import { PaymentScheduleListComponent } from './pages/payment-schedule-list/payment-schedule-list.component';
import { FeePaymentFormComponent } from './pages/fee-payment-form/fee-payment-form.component';
import { ConfirmPaymentMarketComponent } from './pages/confirm-payment-market/confirm-payment-market.component';
import { RoleGuard } from 'src/app/guards/role.guard';

export const PaymentScheduleRoutes: Routes = [
  {
    path: 'pagar',
    redirectTo: '/mis-inmuebles',
    pathMatch: 'full',
  },
  {
    path: ':preSaleId',
    canActivate: [RoleGuard],
    component: PaymentScheduleListComponent,
    data: {
      title: 'Mis Cuotas',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Cuotas' }],
      roles: ['user'],
    },
  },
  {
    path: 'pagar/:paymentScheduleId',
    canActivate: [RoleGuard],
    component: FeePaymentFormComponent,
    data: {
      title: 'Pagar Cuota',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Pago' }],
      roles: ['user', 'admin'],
    },
  },
  // {
  //   path: 'validar-mercado-pago/:paymentScheduleId',
  //   canActivate: [RoleGuard],
  //   component: ConfirmPaymentMarketComponent,
  //   data: {
  //     title: 'Mercado Pago',
  //     urls: [
  //       { title: 'Mis Inmuebles', url: '/mis-inmuebles' },
  //       { title: 'Mercado Pago' },
  //     ],
  //     roles: ['user'],
  //   },
  // },
];
