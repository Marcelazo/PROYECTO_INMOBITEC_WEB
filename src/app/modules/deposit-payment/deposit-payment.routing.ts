import { Routes } from '@angular/router';
import { DepositPaymentListComponent } from './pages/list/list.component';

export const DepositPaymentRoutes: Routes = [
  {
    path: '',
    component: DepositPaymentListComponent,
    data: {
      title: 'Depósitos o Transferencias',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Depósitos' }],
    },
  },
  // {
  //   path: ':preSaleId',
  //   component: PaymentScheduleListComponent,
  //   data: {
  //     title: 'Mis Cuotas',
  //     urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Cuotas' }],
  //   },
  // },
];
