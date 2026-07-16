import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cities',
  },
  {
    path: 'cities',
    loadChildren: () => import('./domain/cities/routes/cities.routes').then(m => m.CITIES_ROUTES),
  },
];
