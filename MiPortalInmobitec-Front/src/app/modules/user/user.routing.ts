import { Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const UserRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/mi-perfil',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: UserProfileComponent,
    // canActivate: [RolesGuard],
    data: {
      title: 'Mi Perfil',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Perfil' }],
    },
  },
];
