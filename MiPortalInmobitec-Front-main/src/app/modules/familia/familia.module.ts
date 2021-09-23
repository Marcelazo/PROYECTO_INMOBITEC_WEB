import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FamiliaRoutes } from './familia.routing';
import { FamiliaComponent } from './pages/familia.component';
import { FamiliaDialogComponent } from './shared/familia-dialog.component'


@NgModule({
  declarations: [
    FamiliaComponent,
    FamiliaDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(FamiliaRoutes),
  ]
})
export class FamiliaModule { }
