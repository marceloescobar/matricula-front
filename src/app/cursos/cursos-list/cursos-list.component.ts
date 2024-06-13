import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../model/curso';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss'],
})
export class CursosListComponent {
  @Input()
  cursos: Curso[] = [];

  @Output()
  add = new EventEmitter(false);

  @Output()
  edit = new EventEmitter(false);

  @Output()
  remove = new EventEmitter(false);

  readonly displayedColumns = ['nome', 'categoria', 'acoes'];

  constructor() {}
  onAdicionarCurso() {
    this.add.emit(true);
  }

  onEditarCurso(curso: Curso) {
    this.edit.emit(curso);
  }

  onRemoverCurso(curso: Curso) {
    this.remove.emit(curso);
  }
}
