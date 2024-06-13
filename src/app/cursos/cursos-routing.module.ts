import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursosComponent } from './cursos/cursos.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoResolver } from './guards/curso.resolver';

const routes: Routes = [
  {path: '', component: CursosComponent},
  {path: 'novo', component: CursoFormComponent, resolve: { curso: CursoResolver}},
  {path: 'edit/:id', component: CursoFormComponent, resolve: { curso: CursoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
