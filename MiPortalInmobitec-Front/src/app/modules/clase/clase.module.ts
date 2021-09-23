import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ClaseRoutes } from './clase.routing';
import { ClaseComponent } from './pages/clase.component';
import { ClaseDialogComponent } from './shared/clase-dialog/clase-dialog.component';



@NgModule({
  declarations: [
    ClaseComponent,
    ClaseDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(ClaseRoutes),
  ]
})
export class ClaseModule { }
