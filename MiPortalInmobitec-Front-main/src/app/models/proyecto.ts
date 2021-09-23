import {
  IDepartamento,
  IDistrito,
  IProvincia,
  IProyecto,
  IGaleriaImage
} from '../interfaces/proyecto.interface';

export class Proyecto {
  id?: number;
  departamento_id:number;
  provincia_id:number;
  distrito_id:number;
  nombre: string;
  img_logo:string;
  img_principal:string;
  departamentos: IDepartamento[];
  provincias: IProvincia[];
  distritos: IDistrito[];
  galerias:IGaleriaImage[];
  // estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: IProyecto) {
    this.id = data.id;
    this.departamento_id=data.departamento_id;
    this.provincia_id=data.provincia_id;
    this.distrito_id=data.distrito_id;
    this.nombre = data.nombre;
    this.img_logo = data.img_logo;
    this.img_principal = data.img_principal;
    this.departamentos = data.departamentos;
    this.provincias = data.provincias;
    this.distritos = data.distritos;
    this.galerias = data.galerias;
    // this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  get tieneGalerias():boolean{
    return this.galerias.length>0;
  }

  getUrlGaleria(imagen:string):string{
    return `http://inmueble-backend.com/storage/imgs/galeria/${imagen}`;
  }

  static empty(data?: { [key: string]: any }): Proyecto {
    return new Proyecto({
      id: 0,
      departamento_id:0,
      provincia_id:0,
      distrito_id:0,
      nombre : '' ,
      img_logo: '',
      img_principal: '',
      departamentos: [],
      provincias: [],
      distritos: [],
      galerias:[],
      // estado: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }
}
