import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familia } from 'src/app/models/familia';

import { FamiliaService } from 'src/app/services/familia.service';

import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { FamiliaForm } from './familia-form';

export interface FamiliaDialogData {
  action: 'create' | 'update' | 'destroy';
  familia: Familia;
  onAddFamilia(result: Familia): void;
  onUpdateFamilia(result: Familia): void;
}

@Component({
  selector: 'app-familia-dialog',
  templateUrl: './familia-dialog.component.html',
  styleUrls: ['./familia-dialog.component.scss']
})
export class FamiliaDialogComponent implements OnInit {

  action: string;
  familiaData: Familia;

  constructor( @Inject(MAT_DIALOG_DATA) public data: FamiliaDialogData,
  public dialogRef: MatDialogRef<FamiliaDialogComponent>,
  public familiaForm: FamiliaForm,
  private snackBar:SnackBarService,
  private familiaService:FamiliaService,
  // private tipoPersonaService:TipoPersonaService
  ) {
    this.familiaData = this.data.familia;
    this.action = this.data.action;

    this.familiaForm.editing = this.action;
    this.familiaForm.data = this.data.familia;
   }

  ngOnInit(): void {
  }

  handleSubmitUser(ngFrmFamilia: NgForm): void {
    if (this.familiaForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const data: any = this.familiaForm.group.value;

    console.log(data);

    if (this.familiaForm.isEditing) {
      //if (this.passwordForm.valid) {
        // const { password, passwordConfirm } = this.passwordForm.group.value;
        // data.password = password;
        // data.password_confirmation = passwordConfirm;
      //}

      this.updateFamilia(data, ngFrmFamilia);
    } else {
      // const { password, passwordConfirm } = this.passwordForm.group.value;
      // data.password = password;
      // data.password_confirmation = passwordConfirm;

      this.addFamilia(data, ngFrmFamilia);
    }
  }


  private updateFamilia(data: any, frm: NgForm): void {
    const id = this.familiaData.id;
    this.familiaService.update(id, data).subscribe(
      (familia: Familia) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El articulo se ha actualizado.',
        });
        this.data?.onUpdateFamilia(familia);
        frm.resetForm();
        //this.passwordForm.group.reset();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un al actualizar usuario.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.familiaForm.setExistErrors();
            break;
        }
        this.snackBar.showMessage({
          type: 'error',
          title: '¡Error!',
          description: message,
        });
      }
    );
  }

  // -------------------------

  private addFamilia(data: any, frm: NgForm): void {
    this.familiaService.store(data).subscribe(
      (newFamilia: Familia) => {
        console.log(newFamilia);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddFamilia(newFamilia);
        frm.resetForm();
        //this.passwordForm.group.reset();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un error al crear cliente.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.familiaForm.setExistErrors();
            break;
        }
        this.snackBar.showMessage({
          type: 'error',
          title: '¡Error!',
          description: message,
        });
      }
    );
  }

   closeDialog(): void {
    this.familiaForm.group.reset();
    this.dialogRef?.close();
  }


}
