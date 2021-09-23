import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MarcaRoutes } from './marca.routing';
import { MarcaComponent } from './pages/marca.component';
import { MarcaDialogComponent } from './shared/marca-dialog/marca-dialog.component'

@NgModule({
  declarations: [
    MarcaComponent,
    MarcaDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(MarcaRoutes),
  ],
})
export class MarcaModule {}
