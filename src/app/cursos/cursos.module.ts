import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosListComponent } from './cursos-list/cursos-list.component';

@NgModule({
    imports: [
        CommonModule,
        CursosRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule,
        CursosComponent,
        CursoFormComponent,
        CursosListComponent
    ]
})
export class CursosModule { }
