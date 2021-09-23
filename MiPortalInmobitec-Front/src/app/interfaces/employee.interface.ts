export interface IEmployee {
  id: number;
  nombre: string;
  apePat: string;
  apeMat: string;
  tipoDocs: number;
  nroDoc: string;
  empresaId: number;
  areaId: number;
  puestoId: number;
  estaCiviles: number;
  fuerzaVenta: number | null;
  direccion: string | null;
  celular: string | null;
  estado: number;
  supervisorId: number | null;
  createdAt: string;
  updatedAt: string;
}
