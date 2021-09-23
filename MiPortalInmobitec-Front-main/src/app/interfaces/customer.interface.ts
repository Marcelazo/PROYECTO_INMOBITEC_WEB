export interface ICustomer {
  id: number;
  nombre: string;
  apePat: string;
  apeMat: string;
  tipoDocs: number;
  nroDoc: string;
  direccion: string | null;
  telefono: string | null;
  celular: string | null;
  estaCiviles: number | null;
  email: string | null;
  conId: number | null;
  estado: number;
  empleadoId: number | null;
  emailVerifiedAt: string | null;
  createdBy: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
