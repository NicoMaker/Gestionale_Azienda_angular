import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Dashboard · Gestionale',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    // :nome = nome della tabella (clienti, fatture, ...), viene passato come input al componente
    path: ':nome',
    loadComponent: () => import('./pages/entity-page/entity-page').then((m) => m.EntityPage),
  },
  { path: '**', redirectTo: 'dashboard' },
];
