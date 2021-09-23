import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ubigeo } from 'src/app/interfaces/ubigeo.interface';
import { Cliente } from 'src/app/models/cliente';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ClienteForm } from './cliente-form';
import { ClienteService } from '../../../../services/cliente.service';
import { TipoPersonaService } from '../../../../services/tipo-persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UbigeoService } from 'src/app/services/ubigeo.service';

export interface ClienteDialogData {
  action: 'create' | 'update' | 'destroy';
  cliente: Cliente;
  onAddCliente(result: Cliente): void;
  onUpdateCliente(result: Cliente): void;
}

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {
  action: string;
  clienteData: Cliente;

  // Combos
  tipo_personas: any[] = [];
   /**
   * Ubigeo
   */
    departments: Ubigeo[] = [];
    provinces: Ubigeo[] = [];
    districts: Ubigeo[] = [];

  constructor( @Inject(MAT_DIALOG_DATA) public data: ClienteDialogData,
  public dialogRef: MatDialogRef<ClienteDialogComponent>,
  public clienteForm: ClienteForm,
  private snackBar:SnackBarService,
  private clienteService:ClienteService,
  private ubigeoService:UbigeoService,
  private tipoPersonaService:TipoPersonaService
  ) {
    this.clienteData = this.data.cliente;
    this.action = this.data.action;

    this.clienteForm.editing = this.action;
    this.clienteForm.data = this.data.cliente;
   }

  ngOnInit(): void {
    this.getDepartments();
    // this.cargarTipoPersonas();
    if(this.action=='update'){
      this.getProvinces(this.clienteData.departamento_id);
      this.getDistricts(this.clienteData.provincia_id);
    }
  }

  // cargarTipoPersonas(): void {
  //   this.tipoPersonaService.getAll().subscribe((res:any[])=>{
  //     console.log(res);
  //     this.tipo_personas = res;
  //   },(error)=>{
  //     console.error(error)
  //   })
  // }

     /**
   * Ubigeo
   */
      private getDepartments(): void {
        this.ubigeoService.getDepartments().subscribe((res: Ubigeo[]) => {
          this.departments = res;
        });
      }

      getProvinces(department: any, clean = true): void {
        this.ubigeoService.getProvinces(department).subscribe((res: Ubigeo[]) => {
          this.provinces = res;
        });
      }

      getDistricts(province: any, clean = true): void {
        const { departamento_id } = this.clienteForm.group.value;

        this.ubigeoService
          .getDistricts(departamento_id, province)
          .subscribe((res: Ubigeo[]) => {
            this.districts = res;
          });
      }

  handleSubmitUser(ngFrmCliente: NgForm): void {
    if (this.clienteForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    //  if (!this.clienteForm.isEditing && this.passwordForm.invalid) {
    //    this.passwordForm.markAsTouched();
    //    this.snackBar.showMessage({
    //      type: 'error',
    //      title: '¡Error!',
    //      description: 'Complete los campos de contraseña.',
    //    });
    //    return;
    //  }

     const data: any = this.clienteForm.group.value;

    console.log(data);


      if (this.clienteForm.isEditing) {
        //if (this.passwordForm.valid) {
          // const { password, passwordConfirm } = this.passwordForm.group.value;
          // data.password = password;
          // data.password_confirmation = passwordConfirm;
        //}

        this.updateCliente(data, ngFrmCliente);
      } else {
        // const { password, passwordConfirm } = this.passwordForm.group.value;
        // data.password = password;
        // data.password_confirmation = passwordConfirm;

        this.addCliente(data, ngFrmCliente);
      }

   }

   //-------------------------------------
   private updateCliente(data: any, frm: NgForm): void {
    const id = this.clienteData.id;
    this.clienteService.update(id, data).subscribe(
      (cliente: Cliente) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha actualizado.',
        });
        this.data?.onUpdateCliente(cliente);
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
            this.clienteForm.setExistErrors();
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

  //-----------------------------------------
  private addCliente(data: any, frm: NgForm): void {
    this.clienteService.store(data).subscribe(
      (newCliente: Cliente) => {
        console.log(newCliente);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddCliente(newCliente);
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
            this.clienteForm.setExistErrors();
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
    this.clienteForm.group.reset();
    this.dialogRef?.close();
  }
}
