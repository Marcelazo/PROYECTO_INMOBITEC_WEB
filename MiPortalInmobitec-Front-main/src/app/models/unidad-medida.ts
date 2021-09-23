import {
  IUnidadMedida
} from '../interfaces/unidad-medida.interface';

export class UnidadMedida {
  id: number;
  nombre: string;
  simbolo: string;
  descripcion: string;
  orden: string;
  estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IUnidadMedida) {
    this.id = data.id;
   this.nombre = data.nombre;
   this.simbolo = data.simbolo;
   this.descripcion = data.descripcion;
   this.orden = data.orden;
   this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): UnidadMedida {
    return new UnidadMedida({
      id: 0,
      nombre : '' ,
      simbolo:'',
      descripcion: '',
      orden: '',
      estado: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }
}
