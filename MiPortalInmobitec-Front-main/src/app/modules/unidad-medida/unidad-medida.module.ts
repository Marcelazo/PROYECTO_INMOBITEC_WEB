import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UnidadMedidaRoutes } from './unidad-medida.routing';
import { UnidadMedidaComponent } from './pages/unidad-medida.component';
import { UnidadMedidaDialogComponent } from './shared/unidad-medida-dialog/unidad-medida-dialog.component'

@NgModule({
  declarations: [
    UnidadMedidaComponent,
    UnidadMedidaDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(UnidadMedidaRoutes),
  ],
})
export class UnidadMedidaModule {}
