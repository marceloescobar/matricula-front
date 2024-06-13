import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { CursosService } from '../services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../model/curso';
import { Aula } from '../model/aula';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss'],
})
export class CursoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    //this.form
  }
  ngOnInit(): void {
    const curso: Curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.nonNullable.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      categoria: [curso.categoria, [Validators.required]],
      aulas: this.formBuilder.array(
        this.obterAulas(curso),
        Validators.required
      ),
    });
  }

  private obterAulas(curso: Curso) {
    const aulas = [];
    if (curso?.aulas) {
      curso.aulas.forEach((aula) => aulas.push(this.criarAula(aula)));
    } else {
      aulas.push(this.criarAula());
    }

    return aulas;
  }

  private criarAula(aula: Aula = { id: '', nome: '', url: '' }) {
    return this.formBuilder.nonNullable.group({
      id: [aula.id],
      nome: [
        aula.nome,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      url: [
        aula.url,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  getAulasFormArray() {
    return (<UntypedFormArray>this.form.get('aulas')).controls;
  }

  addNovaAula() {
    const aulas = this.form.get('aulas') as UntypedFormArray;
    aulas.push(this.criarAula());
  }

  removerAula(index: number) {
    const aulas = this.form.get('aulas') as UntypedFormArray;
    aulas.removeAt(index);
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.salvar(this.form.value).subscribe({
        next: (data) => this.onSucess(),
        error: () => {
          this.onError();
        },
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
