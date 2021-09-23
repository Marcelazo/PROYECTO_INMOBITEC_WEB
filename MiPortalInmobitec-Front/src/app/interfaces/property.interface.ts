export interface IProperty {
  id: number;
  proyectoId: number;
  tipoInmuebleId: number;
  m2: string;
  manzana: string;
  lote: number;
  loteA: number | null;
  estado: number;
  createdAt: string;
  updatedAt: string;
}
