import {
  IFamilia
} from '../interfaces/familia.interface';

export class Familia {
  id: number;
  nombre: string;
  descripcion: string;
  orden: string;
  estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IFamilia) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.orden = data.orden;
    this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): Familia {
    return new Familia({
      id: 0,
      nombre : '' ,
      descripcion: '',
      orden: '',
      estado: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }
}
