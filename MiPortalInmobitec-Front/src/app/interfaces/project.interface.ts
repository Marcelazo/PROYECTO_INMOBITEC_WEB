export interface IProject {
  id: number;
  empresaId: number;
  nombre: string;
  descripcion: string | null;
  direccion: string | null;
  departamento: string | null;
  ciudad: string | null;
  telefono: string | null;
  sinMz: number;
  createdAt: string;
  updatedAt: string;
}
