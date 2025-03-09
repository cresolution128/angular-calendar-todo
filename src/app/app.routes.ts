import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent)
  },
];

