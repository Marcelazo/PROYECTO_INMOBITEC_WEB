import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AppBlankComponent } from './layouts/blank/blank.component';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'mis-inmuebles',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/property/property.module').then(
            (m) => m.PropertyModule
          ),
      },
      {
        path: 'cuotas',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/payment-schedule/payment-schedule.module').then(
            (m) => m.PaymentScheduleModule
          ),
      },
      {
        path: 'mantenimiento/unidad-medida',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/unidad-medida/unidad-medida.module').then(
            (m) => m.UnidadMedidaModule
          ),
      },
      {
        path: 'mantenimiento/marca',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/marca/marca.module').then(
            (m) => m.MarcaModule
          ),
      },
      {
        path: 'mantenimiento/grupo',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/grupo/grupo.module').then(
            (m) => m.GrupoModule
          ),
      },
      {
        path: 'mantenimiento/familia',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/familia/familia.module').then((m) => m.FamiliaModule),
      },
      {
        path: 'proyecto/crear-proyecto',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/proyecto/proyecto.module').then((m) => m.ProyectoModule),
      },
      {
        path: 'mantenimiento/clase',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/clase/clase.module').then((m) => m.ClaseModule),
      },
      {
        path: 'mi-perfil',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'articulo',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/articulo/articulo.module').then((m) => m.ArticuloModule),
        },
      {
        path: 'cliente',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/cliente/cliente.module').then((m) => m.ClienteModule),
      },
      {
        path: 'proveedor',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/proveedor/proveedor.module').then((m) => m.ProveedorModule),
      },

    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'errors',
        loadChildren: () =>
          import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/errors/404',
  },
];
