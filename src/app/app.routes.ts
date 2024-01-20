import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'destinos',
    pathMatch: 'full',
  },
  {
    path: 'destinos',
    loadComponent: () => import('./destinos/destinos.page').then( m => m.DestinosPage)
  },
  {
    path: 'modal1',
    loadComponent: () => import('./modal1/modal1.page').then( m => m.Modal1Page)
  },
];
