import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { MarcaForm } from './marca-form';

export interface MarcaDialogData {
  action: 'create' | 'update' | 'destroy';
  marca: Marca;
  onAddMarca(result: Marca): void;
  onUpdateMarca(result: Marca): void;
}

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.scss']
})
export class MarcaDialogComponent implements OnInit {

  action: string;
  marcaData: Marca;

  constructor( @Inject(MAT_DIALOG_DATA) public data: MarcaDialogData,
  public dialogRef: MatDialogRef<MarcaDialogComponent>,
  public marcaForm: MarcaForm,
  private snackBar:SnackBarService,
  private marcaService:MarcaService,
  // private tipoPersonaService:TipoPersonaService
  ) {
    this.marcaData = this.data.marca;
    this.action = this.data.action;

    this.marcaForm.editing = this.action;
    this.marcaForm.data = this.data.marca;
   }

  ngOnInit(): void {
  }

  handleSubmitUser(ngFrmMarca: NgForm): void {
    if (this.marcaForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const data: any = this.marcaForm.group.value;

    console.log(data);

    if (this.marcaForm.isEditing) {
      //if (this.passwordForm.valid) {
        // const { password, passwordConfirm } = this.passwordForm.group.value;
        // data.password = password;
        // data.password_confirmation = passwordConfirm;
      //}

      this.updateMarca(data, ngFrmMarca);
    } else {
      // const { password, passwordConfirm } = this.passwordForm.group.value;
      // data.password = password;
      // data.password_confirmation = passwordConfirm;

      this.addMarca(data, ngFrmMarca);
    }
  }


  private updateMarca(data: any, frm: NgForm): void {
    const id = this.marcaData.id;
    this.marcaService.update(id, data).subscribe(
      (marca: Marca) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El articulo se ha actualizado.',
        });
        this.data?.onUpdateMarca(marca);
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
            this.marcaForm.setExistErrors();
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

  private addMarca(data: any, frm: NgForm): void {
    this.marcaService.store(data).subscribe(
      (newMarca: Marca) => {
        console.log(newMarca);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddMarca(newMarca);
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
            this.marcaForm.setExistErrors();
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
    this.marcaForm.group.reset();
    this.dialogRef?.close();
  }


}
