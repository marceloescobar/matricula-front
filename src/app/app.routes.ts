import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cursos'},
  {path:'cursos',
    loadChildren: () => import('./cursos/cursos.route').then(m => m.CURSOS_ROUTES)
  }
];
