import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: '',
      urls: [{ title: 'Inicio' }],
    },
  },
];
