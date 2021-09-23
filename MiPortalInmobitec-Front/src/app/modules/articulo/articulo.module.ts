import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ArticuloRoutes } from './articulo.routing';
import { ArticuloComponent } from './pages/articulo.component';
import { ArticuloDialogComponent } from './shared/articulo-dialog/articulo-dialog.component';
import { ImageInputComponent } from './shared/image-input/image-input.component'

@NgModule({
  declarations: [
    ArticuloComponent,
    ArticuloDialogComponent,
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
    RouterModule.forChild(ArticuloRoutes),
  ],
})
export class ArticuloModule {}
