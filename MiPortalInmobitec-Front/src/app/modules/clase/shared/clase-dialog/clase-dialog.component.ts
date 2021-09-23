import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clase } from 'src/app/models/clase';
import { ClaseService } from 'src/app/services/clase.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ClaseForm } from './clase-form';

export interface ClaseDialogData {
  action: 'create' | 'update' | 'destroy';
  clase: Clase;
  onAddClase(result: Clase): void;
  onUpdateClase(result: Clase): void;
}

@Component({
  selector: 'app-clase-dialog',
  templateUrl: './clase-dialog.component.html',
  styleUrls: ['./clase-dialog.component.scss']
})
export class ClaseDialogComponent implements OnInit {

  action: string;
  claseData: Clase;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ClaseDialogData,
  public dialogRef: MatDialogRef<ClaseDialogComponent>,
  public claseForm: ClaseForm,
  private snackBar:SnackBarService,
  private claseService:ClaseService){
    this.claseData = this.data.clase;
    this.action = this.data.action;
    this.claseForm.editing = this.action;
    this.claseForm.data = this.data.clase;
  }

  ngOnInit(): void {
  }

  handleSubmitClase(ngFrmClase: NgForm): void {
    if (this.claseForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }
    const data: any = this.claseForm.group.value;
    console.log(data);
    if (this.claseForm.isEditing) {
      this.updateClase(data, ngFrmClase);
    } else {
      this.addClase(data, ngFrmClase);
    }
  }
  //------------------------------------------------------
  private updateClase(data: any, frm: NgForm): void {
    const id = this.claseData.id;
    this.claseService.update(id, data).subscribe(
      (clase: Clase) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El grupo se ha actualizado.',
        });
        this.data?.onUpdateClase(clase);
        frm.resetForm();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un al actualizar usuario.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.claseForm.setExistErrors();
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
  //--------------------------------------------------
  private addClase(data: any, frm: NgForm): void {
    this.claseService.store(data).subscribe(
      (newClase: Clase) => {
        console.log(newClase);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El Grupo se ha registrado correctamente.',
        });
        this.data?.onAddClase(newClase);
        frm.resetForm();
        //this.passwordForm.group.reset();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un error al crear Clase.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.claseForm.setExistErrors();
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
  //----------------------------------------------------------------
  closeDialog(): void {
    this.claseForm.group.reset();
    this.dialogRef?.close();
  }

}//endClass
