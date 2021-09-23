export interface IProyecto {
  id?: number;
  departamento_id:number;
  provincia_id:number;
  distrito_id:number;
  nombre: string;
  img_logo:string;
  img_principal:string;
  // estado: number;
  departamentos:IDepartamento[];
  provincias:IProvincia[];
  distritos:IDistrito[];
  createdAt: string;
  updatedAt: string;
  galerias:IGaleriaImage[];
}
export interface IDepartamento {
  id: number;
  name:string;
}
export interface IProvincia {
  id: number;
  name:string;
}
export interface IDistrito {
  id: number;
  name:string;
}

export interface IGaleriaImage {
  id: number;
  nombre:string;
  proyecto_id: number;
  accion?:string;
}
