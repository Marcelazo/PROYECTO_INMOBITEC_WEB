import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from 'src/app/models/articulo';
import { IArticuloImage } from 'src/app/interfaces/articulo.interface';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { TipoMonedaService } from 'src/app/services/tipo-moneda.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { ClaseService } from 'src/app/services/clase.service';
import { MarcaService } from 'src/app/services/marca.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ArticuloForm } from './articulo-form';
import {
  EventCancelImage,
  EventChangeImage,
} from 'src/app/modules/articulo/shared/image-input/image-input';
import { ActivatedRoute } from '@angular/router';

export interface FileUpload {
  id: number;
  data: File | string;
  state: string;
}

export interface ArticuloDialogData {
  action: 'create' | 'update' | 'destroy';
  articulo: Articulo;
  images: any[];
  onAddArticulo(result: Articulo): void;
  onUpdateArticulo(result: Articulo): void;
}

@Component({
  selector: 'app-articulo-dialog',
  templateUrl: './articulo-dialog.component.html',
  styleUrls: ['./articulo-dialog.component.scss']
})
export class ArticuloDialogComponent implements OnInit {
  propertyId: any = '';
  action: string;
  articuloData: Articulo;
  images: FileUpload[] = [];
  articuloImages: IArticuloImage[] | File[] = [];
  unidades_medida: any[] = [];
  tipo_monedas: any[] = [];
  familias: any[] = [];
  clases: any[] = [];
  grupos: any[] = [];
  marcas: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ArticuloDialogData,
  public dialogRef: MatDialogRef<ArticuloDialogComponent>,
  public articuloForm: ArticuloForm,
  private snackBar:SnackBarService,
  private articuloService:ArticuloService,
  private unidadMedidaService:UnidadMedidaService,
  private tipoMonedaService:TipoMonedaService,
  private familiaService:FamiliaService,
  private claseService:ClaseService,
  private marcaService:MarcaService,
  private route: ActivatedRoute
  // private tipoPersonaService:TipoPersonaService
  ) {
    this.articuloData = this.data.articulo;
    this.action = this.data.action;

    this.articuloForm.editing = this.action;
    this.articuloForm.data = this.data.articulo;

    this.propertyId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {

    this.cargarUnidadMedida();
    this.cargarMarca();
    this.cargarTipoMoneda();
    this.cargarFamilia();
    if(this.action=='update'){
      this.cargarClase(this.articuloData.familia_id);
      this.cargarGrupo(this.articuloData.clase_id);
    }
    if(this.data.articulo.tieneGalerias){
      const { galerias } = this.data.articulo;
      //const _images=[];
      for (const galeria of galerias) {
        const url=this.data.articulo.getUrlGaleria(galeria.imagen);
        //-----------
        this.images[galeria.id] = {
          id: galeria.id,
          data: url,
          state: 'in',
        } as FileUpload;

        this.articuloImages[galeria.id] = {
          id: galeria.id,
          imagen: galeria?.imagen ?? '',
          articulo_id: galeria.articulo_id,
          accion: '', // eliminar | actualizar
        } as IArticuloImage;
      }
      // this.images=_images.filter(image=>{
      //   return image!=undefined &&  image!=null
      // })
    }

  }

  cargarUnidadMedida(): void {
    this.unidadMedidaService.getAll().subscribe((res:any[])=>{
      this.unidades_medida = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarMarca(): void {
    this.marcaService.getAll().subscribe((res:any[])=>{
      this.marcas = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarTipoMoneda(): void {
    this.tipoMonedaService.getAll().subscribe((res:any[])=>{
      this.tipo_monedas = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarFamilia(): void {
    this.familiaService.getAll().subscribe((res:any[])=>{
      this.familias = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarClase(familia:number): void {
    this.familiaService.getClases(familia).subscribe((res:any[])=>{
      this.clases = res;
    },(error)=>{
      console.error(error)
    })
  }

  cargarGrupo(grupo:number): void {
    this.claseService.getGrupos(grupo).subscribe((res:any[])=>{
      this.grupos = res;
    },(error)=>{
      console.error(error)
    })
  }



  handleSubmitUser(ngFrmArticulo: NgForm): void {
    if (this.articuloForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }
    let i = 1;
    const data: any = this.articuloForm.group.value;
    const formData = new FormData();

    for(const key in data){
      if(Object.prototype.hasOwnProperty.call(data,key)){
        const value = data[key];
        formData.append(key,value);
      }
    }
    //console.log(this.images);return;
    for(const image of this.images){
      formData.append(`imagenes[${i}]`,image?.data);
      i++;
    }

    if (this.articuloForm.isEditing) {
      this.updateArticulo(data, ngFrmArticulo);
    } else {
      this.addArticulo(formData, ngFrmArticulo);
    }
  }
  private updateArticulo(data: any, frm: NgForm): void {
    const id = this.articuloData.id;
    this.articuloService.update(id, data).subscribe(
      (articulo: Articulo) => {
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El articulo se ha actualizado.',
        });
        this.data?.onUpdateArticulo(articulo);
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
            this.articuloForm.setExistErrors();
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
handleUpdateImages(): void {
  console.log(this.images);
  console.log(this.articuloImages);

  if (!this.articuloImages.length) {
    this.snackBar.showMessage({
      type: 'warning',
      title: '¡Error!',
      description: 'Complete los datos de los campos requeridos.',
    });
    return;
  }

  const data = new FormData();

  this.articuloImages.forEach(
    (image: IArticuloImage | File | null, key: number) => {
      if (image !== undefined && image !== null) {
        if (image instanceof File) {
          data.append(`imagenes[${key}]`, image);
        } else {
          data.append(`imagenes[${key}]`, JSON.stringify(image));
        }
      }
    }
  );

  this.articuloService.updateImages(this.data.articulo.id, data).subscribe(
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
// -------------------------
  private addArticulo(data: any, frm: NgForm): void {
    this.articuloService.store(data).subscribe(
      (newCliente: Articulo) => {
        console.log(newCliente);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'El cliente se ha registrado correctamente.',
        });
        this.data?.onAddArticulo(newCliente);
        frm.resetForm();
        this.dialogRef?.close();
      },
      (err: HttpErrorResponse) => {
        const { status, error } = err;
        let message = 'Ah ocurrido un error al crear cliente.';
        switch (status) {
          case 400:
            message = error?.mensaje ?? 'Error';
            this.articuloForm.setExistErrors();
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
    this.articuloForm.group.reset();
    this.dialogRef?.close();
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
        this.articuloImages.push(file);
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

    /**
   * Manejando cuando cambia una imagen
   */
     handleChangeImageInput(e: EventChangeImage): void {
      this.images[e.id] = {
        id: e.id,
        data: e.file,
        state: 'in',
      };
      this.articuloImages[e.id] = e.file;
    }

    /**
   * Manejando cuando cancelan una imagen
   */
    handleCancelImageInput(e: EventCancelImage): void {
      console.log('CancelImage images', e);
      if (e.state === 'in') {
        this.images.splice(e.id, 1);
        this.articuloImages.forEach((value: any) => {
          if (typeof value === 'object' && value.id == e.id) {
            value.accion = 'eliminar';
          }
        });
      }
    }

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

}
