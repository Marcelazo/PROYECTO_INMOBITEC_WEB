import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundErrorComponent } from './404/not-found-error.component';
import { ErrorsRoutes } from './errors.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    // FormsModule,
    MatIconModule,
    // MatCardModule,
    // MatInputModule,
    // MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(ErrorsRoutes),
  ],
  declarations: [NotFoundErrorComponent],
})
export class ErrorsModule {}
