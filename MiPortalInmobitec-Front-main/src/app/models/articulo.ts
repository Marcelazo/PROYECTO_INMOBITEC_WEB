
import { environment } from 'src/environments/environment';
import {
  IArticulo, IArticuloImage
} from '../interfaces/articulo.interface';

export class Articulo {
  id: number;
  codigo: string;
  descripcion: string;
  observacion: string;
  valor_costo: string;
  valor_venta: string;
  modelo: string;
  tamaño: string;
  color: string;
  familia_id: number;
  clase_id: number;
  grupo_id: number;
  marca_id: number;
  unidadMedida_id: number;
  tipoMoneda_id: number;
  peso_neto: string;
  peso_envase: string;
  peso_bruto: string;
  estado: number;
  galerias: IArticuloImage[];
  createdAt: string;
  updatedAt: string;

  constructor(data: IArticulo) {
    this.id = data.id;
    this.codigo= data.codigo;
    this.descripcion = data.descripcion;
    this.observacion = data.observacion;
    this.valor_costo = data.valor_costo;
    this.valor_venta = data.valor_venta;
    this.modelo = data.modelo;
    this.tamaño = data.tamaño;
    this.color = data.color;
    this.familia_id = data.familia_id;
    this.clase_id = data.clase_id;
    this.grupo_id = data.grupo_id;
    this.marca_id = data.marca_id;
    this.unidadMedida_id = data.unidadMedida_id;
    this.tipoMoneda_id = data.tipoMoneda_id;
    this.peso_neto = data.peso_neto;
    this.peso_envase = data.peso_envase;
    this.peso_bruto = data.peso_bruto;
    this.galerias = data.galerias ?? [];
    this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  static empty(data?: { [key: string]: any }): Articulo {
    return new Articulo({
      id: 0,
      codigo: '',
      descripcion: '',
      observacion: '',
      valor_costo: '',
      valor_venta: '',
      modelo: '',
      tamaño: '',
      color: '',
      familia_id: 0,
      clase_id: 0,
      grupo_id: 0,
      marca_id: 0,
      unidadMedida_id: 0,
      tipoMoneda_id: 0,
      peso_neto: '',
      peso_envase: '',
      peso_bruto: '',
      estado: 0,
      galerias:[],
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }

  get tieneGalerias():boolean{
    return this.galerias.length>0;
  }

  getUrlGaleria(imagen:string):string{
    return `${environment.url}/storage/img/galeria/${imagen}`;
  }

}
