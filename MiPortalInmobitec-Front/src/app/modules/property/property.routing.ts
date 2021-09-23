import { Routes } from '@angular/router';
import { PropertyListComponent } from './pages/property-list/property-list.component';

export const PropertyRoutes: Routes = [
  {
    path: '',
    component: PropertyListComponent,
    // canActivate: [RolesGuard],
    data: {
      title: 'Mis Inmuebles',
      urls: [{ title: 'Inicio', url: '/inicio' }, { title: 'Inmuebles' }],
    },
  },
];
