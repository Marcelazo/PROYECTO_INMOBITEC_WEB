export interface ICliente {
  id: number;
  nro_doc: string;
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  // estado: number;
  departamento_id: number;
  provincia_id: number;
  distrito_id: number;
  // tipo_persona_id: string;
  createdAt: string;
  updatedAt: string;
}
