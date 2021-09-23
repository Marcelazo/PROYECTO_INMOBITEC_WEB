import { IPreSale } from "./pre-sale.interface";

export interface IPaymentSchedule {
  id: number;
  ticket: any;
  preVentaId: number;
  preSale: IPreSale | null;
  fechaPago: string;
  monto: string;
  estado: number;
  nroCuota: number;
  createdAt: string;
  updatedAt: string;
}
