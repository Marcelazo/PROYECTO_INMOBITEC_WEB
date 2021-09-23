import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EventCancelImage,
  EventChangeImage,
} from 'src/app/modules/articulo/shared/image-input/image-input';
import { IGaleria } from 'src/app/interfaces/galeria.interface';
import { Galeria } from 'src/app/models/galeria';
import { Proyecto } from 'src/app/models/proyecto';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { GaleriaService } from 'src/app/services/galeria.service';

export interface FileUpload {
  id: number;
  data: File | string;
  state: string;
}

export interface GaleriaDialogData {
  action: 'create' | 'update' | 'destroy';
  galeria: Galeria;
  images: any[];
  onAddProyecto(result: Proyecto): void;
  onUpdateProyecto(result: Proyecto): void;
}


@Component({
  selector: 'app-galeria-dialog',
  templateUrl: './galeria-dialog.component.html',
  styleUrls: ['./galeria-dialog.component.scss']
})
export class GaleriaDialogComponent implements OnInit {

  images: FileUpload[] = [];
  galeriaImages:IGaleria[] | File[] = [];
  action: string;

  constructor(@Inject (MAT_DIALOG_DATA) public data: GaleriaDialogData,
  public dialogRef: MatDialogRef<GaleriaDialogComponent>,
  // public articuloForm: ArticuloForm,
  private snackBar:SnackBarService,
  private route: ActivatedRoute,
  private galeriaService:GaleriaService
  ) {
    // this.action = this.data.action;
    this.action = 'create';
    // this.action = 'update';
  }

  ngOnInit(): void {
  }

  handleChangeFilesInput(e: any): void {
    const files = e?.target?.files ?? new FileList();
    var id=0;
    if(this.action=='update'){
      const last = this.lastImage;
       id = last?.id + 1;
    }else if(this.action=='create'){
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
      }else
      if(this.action=='create'){
        this.images.push({
          id: this.images.length + 1,
          data: file,
          state: 'in',
        });
      }

    }
    console.log("hola", typeof this.images);
    console.log("hola2",this.galeriaImages);
  }

  //---------------------------------------------------

  handleChangeImageInput(e: EventChangeImage): void {
    // this.images[e.id] = {
    //   id: e.id,
    //   data: e.file,
    //   state: 'in',
    // };
    // this.galeriaImages[e.id] = e.file;
  }

   handleCancelImageInput(e: EventCancelImage): void {
     //console.log('CancelImage images', e);
    //  if (e.state === 'in') {
    //    this.images.splice(e.id, 1);
    //    this.galeriaImages.forEach((value: any) => {
    //      if (typeof value === 'object' && value.id == e.id) {
    //        value.accion = 'eliminar';
    //      }
    //    });
    //  }
   }

  //-------------------------------------------------------
  handleUpdateImages(): void {
   // console.log(this.images);
   // console.log(this.articuloImages);
   //console.log(this.data.proyecto.id);
   //return ;
    // if (!this.galeriaImages.length) {
    //   this.snackBar.showMessage({
    //     type: 'warning',
    //     title: '¡Error!',
    //     description: 'Complete los datos de los campos requeridos.',
    //   });
    //   return;
    // }

    const data = new FormData();
    //data.append('proyecto_id',this.data.proyecto.id);
    this.galeriaImages.forEach(
      (image: IGaleria | File | null, key: number) => {
        if (image !== undefined && image !== null) {
          if (image instanceof File) {
            data.append(`imagenes[${key}]`, image);
          } else {
            data.append(`imagenes[${key}]`, JSON.stringify(image));
          }
        }
      }
    );

    // this.galeriaService.store(this.data.articulo.id, data).subscribe(
      this.galeriaService.store(data).subscribe(
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
