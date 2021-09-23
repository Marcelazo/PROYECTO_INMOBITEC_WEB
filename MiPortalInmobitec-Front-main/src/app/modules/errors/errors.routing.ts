import { Routes } from '@angular/router';
import { NotFoundErrorComponent } from './404/not-found-error.component';

export const ErrorsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/errors/404',
        pathMatch: 'full',
      },
      {
        path: '404',
        component: NotFoundErrorComponent,
      },
    ],
  },
];
