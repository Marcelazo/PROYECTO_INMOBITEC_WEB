import { Routes } from '@angular/router';
import { ClaseComponent } from './pages/clase.component';


export const ClaseRoutes: Routes = [
  //  {
  //    path: 'unidad-medida',
  //    redirectTo: '/unidad-medida',
  //    pathMatch: 'full',
  //  },
  {
    path: '',
    component: ClaseComponent,
    data: {
      title: 'Clase',
      urls: [{ title: 'inicio', url: '/inicio' }, { title: 'Inicio' }],
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
