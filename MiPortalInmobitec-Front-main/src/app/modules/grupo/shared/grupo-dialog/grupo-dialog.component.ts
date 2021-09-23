import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/services/grupo.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { GrupoForm } from './grupo-form';

export interface GrupoDialogData {
  action: 'create' | 'update' | 'destroy';
  grupo: Grupo;
  onAddGrupo(result: Grupo): void;
  onUpdateGrupo(result: Grupo): void;
}

@Component({
  selector: 'app-grupo-dialog',
  templateUrl: './grupo-dialog.component.html',
  styleUrls: ['./grupo-dialog.component.scss']
})
export class GrupoDialogComponent implements OnInit {

  action: string;
  grupoData: Grupo;

  constructor( @Inject(MAT_DIALOG_DATA) public data: GrupoDialogData,
  public dialogRef: MatDialogRef<GrupoDialogComponent>,
  public grupoForm: GrupoForm,
  private snackBar:SnackBarService,
  private grupoService:GrupoService,
  // private tipoPersonaService:TipoPersonaService
  ) {
    this.grupoData = this.data.grupo;
    this.action = this.data.action;

    this.grupoForm.editing = this.action;
    this.grupoForm.data = this.data.grupo;
   }

  ngOnInit(): void {
  }

  handleSubmitUser(ngFrmGrupo: NgForm): void {
    if (this.grupoForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const data: any = this.grupoForm.group.value;

    console.log(data);

    if (this.grupoForm.isEditing) {
      //if (this.passwordForm.valid) {
        // const { password, passwordConfirm } = this.passwordForm.group.value;
        // data.password = password;
        // data.password_confirmation = passwordConfirm;
      //}

      this.updateGrupo(data, ngFrmGrupo);
    } else {
      // const { password, passwordConfirm } = this.passwordForm.group.value;
      // data.password = password;
      // data.password_confirmation = passwordConfirm;

      this.addGrupo(data, ngFrmGrupo);
    }
  }

  private updateGrupo(data: any, frm: NgForm): void {
    const id = this.grupoData.id;
    this.grupoService.update(id, data).subscribe(
      (grupo: Grupo) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El grupo se ha actualizado.',
        });
        this.data?.onUpdateGrupo(grupo);
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
            this.grupoForm.setExistErrors();
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

  private addGrupo(data: any, frm: NgForm): void {
    this.grupoService.store(data).subscribe(
      (newGrupo: Grupo) => {
        console.log(newGrupo);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El Grupo se ha registrado correctamente.',
        });
        this.data?.onAddGrupo(newGrupo);
        frm.resetForm();
        //this.passwordForm.group.reset();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un error al crear Grupo.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.grupoForm.setExistErrors();
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
    this.grupoForm.group.reset();
    this.dialogRef?.close();
  }




}
