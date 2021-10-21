import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { PasswordResetGuard } from 'src/app/guards/password-reset.guard';

import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  // {
  //   path: 'lockscreen',
  //   component: LockscreenComponent,
  // },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'password-reset',
    canActivate: [PasswordResetGuard],
    component: PasswordResetComponent,
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
];
