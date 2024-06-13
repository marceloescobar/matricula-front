import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from '../services/cursos.service';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoResolver implements Resolve<Curso> {
  constructor(private cursoService: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.cursoService.buscaPorId(route.params['id']);
    }

    return of({ id: '', nome: '', categoria: '', aulas: [] });
  }
}
