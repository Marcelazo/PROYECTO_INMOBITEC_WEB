export interface IProveedor {
  id: number;
  ruc: string;
  nombre: string;
  giro: string;
  sigla: string;
  direccion: string;
  telefono: string;
  celular: string;
  zip: number;
  email: string;
  estado: number;
  departamento_id: number;
  provincia_id: number;
  distrito_id: number;
  tipo_identificacion_id: number;
  tipo_persona_id: number;
  createdAt: string;
  updatedAt: string;
}
