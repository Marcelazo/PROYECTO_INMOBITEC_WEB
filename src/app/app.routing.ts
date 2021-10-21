import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
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
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['user', 'admin'],
        },
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'mis-inmuebles',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['user'],
        },
        loadChildren: () =>
          import('./modules/property/property.module').then(
            (m) => m.PropertyModule
          ),
      },
      {
        path: 'cuotas',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['user', 'admin'],
        },
        loadChildren: () =>
          import('./modules/payment-schedule/payment-schedule.module').then(
            (m) => m.PaymentScheduleModule
          ),
      },
      {
        path: 'depositos-transferencias',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['admin'],
        },
        loadChildren: () =>
          import('./modules/deposit-payment/deposit-payment.module').then(
            (m) => m.DepositPaymentModule
          ),
      },
      {
        path: 'mi-perfil',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: ['user'],
        },
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
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
