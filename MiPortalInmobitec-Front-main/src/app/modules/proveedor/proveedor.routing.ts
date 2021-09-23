import { Routes } from '@angular/router';
import { ProveedorComponent } from './pages/proveedor.component';


export const ProveedorRoutes: Routes = [
  //  {
  //    path: 'unidad-medida',
  //    redirectTo: '/unidad-medida',
  //    pathMatch: 'full',
  //  },
  {
    path: '',
    component: ProveedorComponent,
    data: {
      title: 'proveedor',
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
