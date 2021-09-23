import { Routes } from '@angular/router';
import { ProyectoComponent } from './pages/proyecto.component';


export const ProyectoRoutes: Routes = [
  //  {
  //    path: 'unidad-medida',
  //    redirectTo: '/unidad-medida',
  //    pathMatch: 'full',
  //  },
  {
    path: '',
    component: ProyectoComponent,
    data: {
      title: 'Proyecto',
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
