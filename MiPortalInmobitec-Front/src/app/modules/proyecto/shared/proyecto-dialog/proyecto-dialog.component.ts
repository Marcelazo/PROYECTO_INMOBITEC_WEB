import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProyectoForm } from './proyecto-form';
import { Ubigeo } from 'src/app/interfaces/ubigeo.interface';
import {
  EventCancelImage,
  EventChangeImage,
} from 'src/app/modules/articulo/shared/image-input/image-input';
import { IGaleriaImage } from 'src/app/interfaces/proyecto.interface';

export interface ProyectoDialogData {
  action: 'create' | 'update' | 'destroy';
  proyecto: Proyecto;
  onAddProyecto(result: Proyecto): void;
  onUpdateProyecto(result: Proyecto): void;
}

export interface FileUpload {
  id: number;
  data: File | string;
  state: string;
}

export interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-proyecto-dialog',
  templateUrl: './proyecto-dialog.component.html',
  styleUrls: ['./proyecto-dialog.component.scss']
})

export class ProyectoDialogComponent implements OnInit {
  url:string='http://inmueble-backend.com/';
  action: string;
  proyectoData: Proyecto;
  fileLogo?:File | string;
  filePrincipal?:File | string;
  images: FileUpload[] = [];
  galeriaImages: IGaleriaImage[] | File[] = [];
  photoSelectedLogo?:string | ArrayBuffer;
  photoSelectedPrincipal?:string | ArrayBuffer;
  departments: Ubigeo[] = [];
  provinces: Ubigeo[] = [];
  districts: Ubigeo[] = [];
  urlLogo : string='';
  urlPrincipal : string='';

  constructor( @Inject(MAT_DIALOG_DATA) public data: ProyectoDialogData,
  public dialogRef: MatDialogRef<ProyectoDialogComponent>,
  public proyectoForm: ProyectoForm,
  private snackBar:SnackBarService,
  private proyectoService:ProyectoService,
  private ubigeoService:UbigeoService,
  ) {
    this.proyectoData = this.data.proyecto;
    this.action = this.data.action;

    this.proyectoForm.editing = this.action;
    this.proyectoForm.data = this.data.proyecto;


   }

  ngOnInit(): void {

    if(this.action=='create'){
      this.urlLogo='assets/images/default.png';
      this.urlPrincipal='assets/images/default.png';
    }
    else if(this.action=='update'){
      this.urlLogo=`${this.url}storage/imgs/proyecto/logo/${this.data?.proyecto?.img_logo}`;
      this.urlPrincipal=`${this.url}storage/imgs/proyecto/principal/${this.data?.proyecto?.img_principal}`;
    }

    this.getDepartments();
    if(this.action=='update'){
      this.getProvinces(this.proyectoData.departamento_id);
      this.getDistricts(this.proyectoData.provincia_id);
    }
    if(this.data.proyecto.tieneGalerias){
      const { galerias } = this.data.proyecto;
      //const _images=[];
      for (const galeria of galerias) {
        const url=this.data.proyecto.getUrlGaleria(galeria.nombre);
        //-----------
        this.images[galeria.id] = {
          id: galeria.id,
          data: url,
          state: 'in',
        } as FileUpload;

        this.galeriaImages[galeria.id] = {
          id: galeria.id,
          nombre: galeria?.nombre ?? '',
          proyecto_id: galeria.proyecto_id,
          accion: '', // eliminar | actualizar
        } as IGaleriaImage;
      }
      // this.images=_images.filter(image=>{
      //   return image!=undefined &&  image!=null
      // })
    }
  }

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
    const { departamento_id } = this.proyectoForm.group.value;

    this.ubigeoService
      .getDistricts(departamento_id, province)
      .subscribe((res: Ubigeo[]) => {
        this.districts = res;
      });
  }

  handleSubmitUser(ngFrmProyecto: NgForm): void | boolean {
    if (this.proyectoForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }
    let i = 1;
    const data: any = this.proyectoForm.group.value;
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        formData.append(key, value);
      }
    }

    for(const image of this.images){
      formData.append(`imagenes[${i}]`,image?.data);
      i++;
    }

      formData.append(`img_logo`, this.fileLogo ?? '');
      formData.append(`img_principal`, this.filePrincipal ?? '');

    if (this.proyectoForm.isEditing) {
      this.updateProyecto(formData, ngFrmProyecto);
    } else {
      this.addProyecto(formData, ngFrmProyecto);
    }
  }

  private updateProyecto(data: any, frm: NgForm): void {
    const id = this.proyectoData.id;
    this.proyectoService.update(id, data).subscribe(
      (Proyecto: Proyecto) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El articulo se ha actualizado.',
        });
        this.data?.onUpdateProyecto(Proyecto);
        frm.resetForm();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un al actualizar usuario.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.proyectoForm.setExistErrors();
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

  private addProyecto(data: any, frm: NgForm): void {
    this.proyectoService.store(data).subscribe(
      (newProyecto: Proyecto) => {
        console.log(newProyecto);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddProyecto(newProyecto);
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
            this.proyectoForm.setExistErrors();
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
    this.proyectoForm.group.reset();
    this.dialogRef?.close();
  }

  onPhotoSelectedLogo(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.fileLogo = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelectedLogo = reader.result ?? '';
      reader.readAsDataURL(this.fileLogo);
    }
  }

  onPhotoSelectedPrincipal(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.filePrincipal = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelectedPrincipal = reader.result ?? '';
      reader.readAsDataURL(this.filePrincipal);
    }
  }

  //-------------------------------------------------------------------------galeria

  handleCancelImageInput(e: EventCancelImage): void {
    console.log('CancelImage images', e);
    if (e.state === 'in') {
      this.images.splice(e.id, 1);
      this.galeriaImages.forEach((value: any) => {
        if (typeof value === 'object' && value.id == e.id) {
          value.accion = 'eliminar';
        }
      });
    }
  }

  handleChangeFilesInput(e: any): void {
    const files = e?.target?.files ?? new FileList();
    //console.log(files);
    //return;
    var id=0;
    if(this.action=='update'){
      const last = this.lastImage;
      //console.log('last');
       id = last?.id + 1;
    }else if(this.action=='create'){
      //console.log('normal');
       id = this.images.length + 1;
    }


    for (const file of files) {
      if(this.action=='update'){
        this.images[id] = {
          id,
          data: file,
          state: 'in',
        };
        this.galeriaImages.push(file);
        this.images.push(file);
      }else if(this.action=='create'){
        this.images.push({
          id: this.images.length + 1,
          data: file,
          state: 'in',
        });
      }

    }
    console.log(this.images);
  }

  //---------
    handleChangeImageInput(e: EventChangeImage): void {
      this.images[e.id] = {
        id: e.id,
        data: e.file,
        state: 'in',
      };
      this.galeriaImages[e.id] = e.file;
    }

    //--------
    get lastImage(): FileUpload  {
      //console.log(this.images,"aqui toy");
     // if(this.images.length>0){
        return this.images.reduce((p,c) => {
          if(!p || !c){
            return {
              id: 0,
              data: '',
              state: 'in',
            };
          }
          return p.id > c.id ? p : c;
        });
      // }else{
      //   return 0;
      // }

    }

    //-----------------------------------------
    handleUpdateImages(): void {
      console.log(this.images);
      console.log(this.galeriaImages);

      if (!this.galeriaImages.length) {
        this.snackBar.showMessage({
          type: 'warning',
          title: '¡Error!',
          description: 'Complete los datos de los campos requeridos.',
        });
        return;
      }

      const data = new FormData();

      this.galeriaImages.forEach(
        (image: IGaleriaImage | File | null, key: number) => {
          if (image !== undefined && image !== null) {
            if (image instanceof File) {
              data.append(`imagenes[${key}]`, image);
            } else {
              data.append(`imagenes[${key}]`, JSON.stringify(image));
            }
          }
        }
      );

      this.proyectoService.updateImages(this.data.proyecto.id, data).subscribe(
        (res: any) => {
          this.snackBar.showMessage({
            type: 'success',
            title: '¡Exito!',
            description: 'Las Fotos se han actualizado correctamente.',
          });

          // const galerias = res?.galerias || [];

        },
        (err) => {
          console.error(err);
          this.snackBar.showMessage({
            type: 'error',
            title: '¡Error!',
            description: 'Ha ocurrido un error, intente nuevamente más tarde.',
          });
        }
      );
    }

} //---------------------endClass
