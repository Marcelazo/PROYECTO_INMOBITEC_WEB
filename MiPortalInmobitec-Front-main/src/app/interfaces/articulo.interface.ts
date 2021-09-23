export interface IArticulo {
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
}

export interface IArticuloImage {
  id: number;
  imagen:string;
  articulo_id: number;
  accion?:string;
}
