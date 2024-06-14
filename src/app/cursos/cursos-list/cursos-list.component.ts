import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../model/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaPipe } from '../../shared/pipes/categoria.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-cursos-list',
    templateUrl: './cursos-list.component.html',
    styleUrls: ['./cursos-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIcon,
        MatMiniFabButton,
        MatIconButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        CategoriaPipe,
    ],
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
