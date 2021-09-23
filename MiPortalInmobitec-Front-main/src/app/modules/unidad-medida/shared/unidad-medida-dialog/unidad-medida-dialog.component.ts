import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadMedida } from 'src/app/models/unidad-medida';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { UnidadMedidaForm } from './unidad-medida-form';

export interface UnidadMedidaDialogData {
  action: 'create' | 'update' | 'destroy';
  unidad_medida: UnidadMedida;
  onAddUnidadMedida(result: UnidadMedida): void;
  onUpdateUnidadMedida(result: UnidadMedida): void;
}



@Component({
  selector: 'app-unidad-medida-dialog',
  templateUrl: './unidad-medida-dialog.component.html',
  styleUrls: ['./unidad-medida-dialog.component.scss']
})
export class UnidadMedidaDialogComponent implements OnInit {

  action: string;
  unidadMedidaData: UnidadMedida;

  constructor( @Inject(MAT_DIALOG_DATA) public data: UnidadMedidaDialogData,
  public dialogRef: MatDialogRef<UnidadMedidaDialogComponent>,
  public unidadMedidaForm: UnidadMedidaForm,
  private snackBar:SnackBarService,
  private unidadMedidaService:UnidadMedidaService,
  // private tipoPersonaService:TipoPersonaService
  ) {
    this.unidadMedidaData = this.data.unidad_medida;
    this.action = this.data.action;

    this.unidadMedidaForm.editing = this.action;
    this.unidadMedidaForm.data = this.data.unidad_medida;
   }

  ngOnInit(): void {
  }

  handleSubmitUser(ngFrmUnidadMedida: NgForm): void {
    if (this.unidadMedidaForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const data: any = this.unidadMedidaForm.group.value;

    console.log(data);

    if (this.unidadMedidaForm.isEditing) {
      //if (this.passwordForm.valid) {
        // const { password, passwordConfirm } = this.passwordForm.group.value;
        // data.password = password;
        // data.password_confirmation = passwordConfirm;
      //}

      this.updateUnidadMedida(data, ngFrmUnidadMedida);
    } else {
      // const { password, passwordConfirm } = this.passwordForm.group.value;
      // data.password = password;
      // data.password_confirmation = passwordConfirm;

      this.addUnidadMedida(data, ngFrmUnidadMedida);
    }
  }

  private updateUnidadMedida(data: any, frm: NgForm): void {
    const id = this.unidadMedidaData.id;
    this.unidadMedidaService.update(id, data).subscribe(
      (unidadMedida: UnidadMedida) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El articulo se ha actualizado.',
        });
        this.data?.onUpdateUnidadMedida(unidadMedida);
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
            this.unidadMedidaForm.setExistErrors();
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

  private addUnidadMedida(data: any, frm: NgForm): void {
    this.unidadMedidaService.store(data).subscribe(
      (newUnidadMedida: UnidadMedida) => {
        console.log(newUnidadMedida);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddUnidadMedida(newUnidadMedida);
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
            this.unidadMedidaForm.setExistErrors();
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
    this.unidadMedidaForm.group.reset();
    this.dialogRef?.close();
  }


}
