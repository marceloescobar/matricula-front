import { Injectable } from '@angular/core';
import { Curso } from '../model/curso';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { Pagina } from './../model/pagina';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = '/assets/cursos.json';
  constructor(private httpClient: HttpClient) {}

  listaCursos(page = 0, pageSize=10) {
    return this.httpClient.get<Pagina<Curso>>(this.API, {params :{page, pageSize}}).pipe(
      first(),
      //delay(5000),
      tap((cursos) => console.log(cursos))
    );
  }

  salvar(curso: Partial<Curso>) {
    if (curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }

  private create(curso: Partial<Curso>){
    return this.httpClient.post<Curso>(this.API, curso);
  }

  private update(curso: Partial<Curso>){
    return this.httpClient.put<Curso>(`${this.API}/${curso.id}`, curso);
  }


  remover(id: string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  buscaPorId(id: string) {
    return this.httpClient.get<Curso>(`${this.API}/${id}`).pipe(first());
  }
}
