export interface IBankAccount {
  id: number;
  bancoId: number;
  tipoCuentaId: number;
  monedaId: number;
  codigoId: number;
  proyectoId: number;
  nroCuenta: string;
  createdAt: string;
  updatedAt: string;
  bank: IBank;
  accountType: IAccountType | null;
  coin: ICoin | null;
}

export interface IBank {
  id: number;
  nombre: string;
  razonSocial: string;
  ruc: string;
}

export interface IAccountType {
  id: number;
  descripcion: string;
}

export interface ICoin {
  id: number;
  codigo: string;
  nombre: string;
}
