import {
  IGaleria
} from '../interfaces/galeria.interface';

export class Galeria {
  id?: number;
  nombre:string;
  proyecto_id:number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IGaleria) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.proyecto_id = data.proyecto_id;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): Galeria {
    return new Galeria({
      id: 0,
      nombre:'',
      proyecto_id:0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }
}
