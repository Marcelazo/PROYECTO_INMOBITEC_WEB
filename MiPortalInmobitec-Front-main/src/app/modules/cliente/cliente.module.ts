import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ClienteRoutes } from './cliente.routing';
import { ClienteComponent } from './pages/cliente.component';
import { ClienteDialogComponent } from './shared/cliente-dialog/cliente-dialog.component'

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(ClienteRoutes),
  ],
})
export class ClienteModule {}
