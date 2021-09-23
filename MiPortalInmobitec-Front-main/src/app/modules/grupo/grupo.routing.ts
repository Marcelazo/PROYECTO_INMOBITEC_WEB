import { Routes } from '@angular/router';
import { GrupoComponent } from './pages/grupo.component';


export const GrupoRoutes: Routes = [
  //  {
  //    path: 'unidad-medida',
  //    redirectTo: '/unidad-medida',
  //    pathMatch: 'full',
  //  },
  {
    path: '',
    component: GrupoComponent,
    data: {
      title: 'Grupo',
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
