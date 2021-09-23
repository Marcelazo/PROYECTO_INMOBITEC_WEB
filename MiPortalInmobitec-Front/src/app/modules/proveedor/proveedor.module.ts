import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ProveedorRoutes } from './proveedor.routing';
import { ProveedorComponent } from './pages/proveedor.component';
import { ProveedorDialogComponent } from './shared/proveedor-dialog/proveedor-dialog.component';

@NgModule({
  declarations: [
    ProveedorComponent,
    ProveedorDialogComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(ProveedorRoutes),
  ],
})
export class ProveedorModule {}
