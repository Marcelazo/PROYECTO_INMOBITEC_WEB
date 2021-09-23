
import {
  IGrupo
} from '../interfaces/grupo.interface';

export class Grupo {
  id: number;
  clase_id: number |undefined;
  nombre: string;
  descripcion: string;
  orden: string;
  estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IGrupo) {
    this.id = data.id;
    this.clase_id= data.clase_id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.orden = data.orden;
    this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): Grupo {
    return new Grupo({
      id: 0,
      clase_id : 0,
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
