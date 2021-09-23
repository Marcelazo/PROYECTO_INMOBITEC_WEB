import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from 'src/app/models/proveedor';
import { Ubigeo } from 'src/app/interfaces/ubigeo.interface';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ProveedorForm } from './proveedor-form';
import { ProveedorService } from '../../../../services/proveedor.service';
import { TipoPersonaService } from '../../../../services/tipo-persona.service';
import { TipoIdentificacionService } from '../../../../services/tipo-identificacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UbigeoService } from 'src/app/services/ubigeo.service';

export interface ProveedorDialogData {
  action: 'create' | 'update' | 'destroy';
  proveedor: Proveedor;
  onAddProveedor(result: Proveedor): void;
  onUpdateProveedor(result: Proveedor): void;
}

@Component({
  selector: 'app-proveedor-dialog',
  templateUrl: './proveedor-dialog.component.html',
  styleUrls: ['./proveedor-dialog.component.scss']
})
export class ProveedorDialogComponent implements OnInit {

  action: string;
  proveedorData: Proveedor;
  // Combos
  tipo_personas: any[] = [];
  tipo_identificaciones: any[] = [];
    /**
   * Ubigeo
   */
     departments: Ubigeo[] = [];
     provinces: Ubigeo[] = [];
     districts: Ubigeo[] = [];

  constructor( @Inject(MAT_DIALOG_DATA) public data: ProveedorDialogData,
  public dialogRef: MatDialogRef<ProveedorDialogData>,
  public proveedorForm: ProveedorForm,
  private snackBar:SnackBarService,
  private proveedorService:ProveedorService,
  private ubigeoService:UbigeoService,
  private tipoPersonaService:TipoPersonaService,
  private tipoIdentificacionService:TipoIdentificacionService
  ) {
    this.proveedorData = this.data.proveedor;
    this.action = this.data.action;

    this.proveedorForm.editing = this.action;
    this.proveedorForm.data = this.data.proveedor;
   }

  ngOnInit(): void {
    this.getDepartments();
    this.cargarTipoPersonas();
    this.cargarTipoIdentificacion();
    if(this.action=='update'){
      this.getProvinces(this.proveedorData.departamento_id);
      this.getDistricts(this.proveedorData.provincia_id);
    }
  }

  cargarTipoPersonas(): void {
    this.tipoPersonaService.getAll().subscribe((res:any[])=>{
      console.log(res);
      this.tipo_personas = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarTipoIdentificacion(): void {
    this.tipoIdentificacionService.getAll().subscribe((res:any[])=>{
      console.log(res);
      this.tipo_identificaciones = res;
    },(error)=>{
      console.error(error)
    })
  }

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
      const { departamento_id } = this.proveedorForm.group.value;

      this.ubigeoService
        .getDistricts(departamento_id, province)
        .subscribe((res: Ubigeo[]) => {
          this.districts = res;
        });
    }

  handleSubmitUser(ngFrmProveedor: NgForm): void {
    if (this.proveedorForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }
     const data: any = this.proveedorForm.group.value;
      if (this.proveedorForm.isEditing) {
        this.updateProveedor(data, ngFrmProveedor);
      } else {
        this.addProveedor(data, ngFrmProveedor);
      }
   }

   //-------------------------------------
   private updateProveedor(data: any, frm: NgForm): void {
    const id = this.proveedorData.id;
    this.proveedorService.update(id, data).subscribe(
      (proveedor: Proveedor) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El proveedor se ha actualizado.',
        });
        this.data?.onUpdateProveedor(proveedor);
        frm.resetForm();
        //this.passwordForm.group.reset();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un al actualizar proveedor.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.proveedorForm.setExistErrors();
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
  private addProveedor(data: any, frm: NgForm): void {
    this.proveedorService.store(data).subscribe(
      (newProveedor: Proveedor) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddProveedor(newProveedor);
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
            this.proveedorForm.setExistErrors();
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
    this.proveedorForm.group.reset();
    this.dialogRef?.close();
  }

}
