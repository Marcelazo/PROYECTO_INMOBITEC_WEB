import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ProyectoRoutes } from './proyecto.routing';
import { ProyectoComponent } from './pages/proyecto.component';
import { ProyectoDialogComponent } from './shared/proyecto-dialog/proyecto-dialog.component';
import { GaleriaDialogComponent } from './shared/galeria-dialog/galeria-dialog.component'
import { ImageInputComponent } from '../../shared/image-input/image-input.component';

@NgModule({
  declarations: [
    ProyectoComponent,
    ProyectoDialogComponent,
    GaleriaDialogComponent,
    ImageInputComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(ProyectoRoutes),
  ],
})
export class ProyectoModule {}
