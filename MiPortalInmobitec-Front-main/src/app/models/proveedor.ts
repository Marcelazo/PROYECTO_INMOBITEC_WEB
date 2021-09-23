
import {
  IProveedor
} from '../interfaces/proveedor.interface';

export class Proveedor {
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

  constructor(data: IProveedor) {
    this.id= data.id,
    this.ruc= data.ruc,
    this.nombre= data.nombre,
    this.giro= data.giro,
    this.sigla= data.sigla,
    this.direccion= data.direccion,
    this.telefono= data.telefono,
    this.celular= data.celular,
    this.zip= data.zip,
    this.email= data.email,
    this.estado= data.estado,
    this.departamento_id= data.departamento_id,
    this.provincia_id= data.provincia_id,
    this.distrito_id= data.distrito_id,
    this.tipo_identificacion_id= data.tipo_identificacion_id,
    this.tipo_persona_id= data.tipo_persona_id,
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

   /**
   * Create a new instaceof User
   * @return new User
   */
    static empty(data?: { [key: string]: any }): Proveedor {
      return new Proveedor({
        id: 0,
        ruc: '',
        nombre: '',
        giro: '',
        sigla: '',
        direccion: '',
        telefono: '',
        celular: '',
        zip: 0,
        email: '',
        estado: 0,
        departamento_id: 0,
        provincia_id: 0,
        distrito_id: 0,
        tipo_identificacion_id: 0,
        tipo_persona_id: 0,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
        ...data,
      });
    }
}
