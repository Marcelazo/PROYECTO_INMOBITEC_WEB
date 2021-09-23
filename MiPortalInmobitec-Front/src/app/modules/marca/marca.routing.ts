import { Routes } from '@angular/router';
import { MarcaComponent } from './pages/marca.component';


export const MarcaRoutes: Routes = [
  //  {
  //    path: 'unidad-medida',
  //    redirectTo: '/unidad-medida',
  //    pathMatch: 'full',
  //  },
  {
    path: '',
    component: MarcaComponent,
    data: {
      title: 'Marca',
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
