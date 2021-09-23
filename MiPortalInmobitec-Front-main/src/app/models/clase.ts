
import {
  IClase
} from '../interfaces/clase.interface';

export class Clase {
  id: number;
  familia_id: number |undefined;
  nombre: string;
  descripcion: string;
  orden: string;
  estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IClase) {
    this.id = data.id;
    this.familia_id= data.familia_id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.orden = data.orden;
    this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): Clase {
    return new Clase({
      id: 0,
      familia_id : 0,
      nombre: '',
      descripcion: '',
      orden: '',
      estado: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }
}
