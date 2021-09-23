import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { GrupoRoutes } from './grupo.routing';
import { GrupoComponent } from './pages/grupo.component';
import { GrupoDialogComponent } from './shared/grupo-dialog/grupo-dialog.component'

@NgModule({
  declarations: [
    GrupoComponent,
    GrupoDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(GrupoRoutes),
  ],
})
export class GrupoModule {}
