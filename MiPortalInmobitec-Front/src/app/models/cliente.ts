
import {
  ICliente
} from '../interfaces/cliente.interface';

export class Cliente {
  id: number;
  nro_doc: string;
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  departamento_id: number;
  provincia_id: number;
  distrito_id: number;
  // tipo_persona_id: string;
  //estado: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: ICliente) {
    this.id = data.id;
    this.nro_doc =data.nro_doc;
    this.nombre =data.nombre;
    this.ape_pat =data.ape_pat;
    this.ape_mat =data.ape_mat;
    this.direccion =data.direccion;
    this.telefono =data.telefono;
    this.celular =data.celular;
    this.email =data.email;
    this.departamento_id =data.departamento_id;
    this.provincia_id =data.provincia_id;
    this.distrito_id =data.distrito_id;
    // this.tipo_persona_id =data.tipo_persona_id;

    //this.estado = data.estado;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

   /**
   * Create a new instaceof User
   * @return new User
   */
    static empty(data?: { [key: string]: any }): Cliente {
      return new Cliente({
        id: 0,
        nro_doc: '',
        nombre: '',
        ape_pat: '',
        ape_mat: '',
        direccion: '',
        telefono: '',
        celular: '',
        email: '',
       // estado: 0,
        departamento_id: 0,
        provincia_id: 0,
        distrito_id: 0,
        // tipo_persona_id: '',
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
        ...data,
      });
    }
}
