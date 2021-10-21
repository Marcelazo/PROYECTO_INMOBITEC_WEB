import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { PropertyRoutes } from './property.routing';
import { PropertyListComponent } from './pages/property-list/property-list.component';

@NgModule({
  declarations: [PropertyListComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(PropertyRoutes),
  ],
})
export class PropertyModule {}
