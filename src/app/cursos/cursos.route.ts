import { Routes } from "@angular/router";
import { CursosComponent } from "./cursos/cursos.component";
import { CursoFormComponent } from "./curso-form/curso-form.component";
import { CursoResolver } from "./guards/curso.resolver";

export const CURSOS_ROUTES: Routes = [
  {path: '', component: CursosComponent},
  {path: 'novo', component: CursoFormComponent, resolve: { curso: CursoResolver}},
  {path: 'edit/:id', component: CursoFormComponent, resolve: { curso: CursoResolver}}
];
