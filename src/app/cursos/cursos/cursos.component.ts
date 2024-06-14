import { Component, OnInit, ViewChild } from '@angular/core';

import { Curso } from '../model/curso';
import { CursosService } from '../services/cursos.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Pagina } from '../model/pagina';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CursosListComponent } from '../cursos-list/cursos-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatToolbar,
        NgIf,
        CursosListComponent,
        MatPaginator,
        MatProgressSpinner,
        AsyncPipe,
    ],
})
export class CursosComponent implements OnInit {
  cursos$: Observable<Pagina<Curso>> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize=10;

  constructor(
    private cursoService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {length:0, pageIndex:0, pageSize: 10}) {
    this.cursos$ = this.cursoService.listaCursos(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(()=> {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of({elementos:[], totalElementos:0,totalPaginas:0 });
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdicionarCurso() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEditarCurso(curso: Curso) {
    this.router.navigate(['edit', curso.id], { relativeTo: this.route });
  }

  onRemoverCurso(curso: Curso) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: ' Tem certeza que deseja remover esse curso ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cursoService.remover(curso.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error: () => this.onError('Erro ao tentar remover o curso'),
        });
      }
    });
  }
}
