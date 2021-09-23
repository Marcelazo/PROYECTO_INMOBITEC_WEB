import { ICompany } from './company.interface';
import { ICustomer } from './customer.interface';
import { IEmployee } from './employee.interface';
import { IPaymentType } from './payment-type.interface';
import { IProject } from './project.interface';
import { IProperty } from './property.interface';

export interface IPreSale {
  id: number;
  clienteId: number;
  empleadoId: number;
  empresaId: number;
  proyectoId: number;
  inmuebleId: number;
  tipoPagoId: number;
  tipoTrataId: number;
  tipoPrecioId: number;
  fechaIniPago: string | null;
  estado: number;
  conCasa: number | null;
  fechaConCasa: string | null;
  diaPagoId: number | null;
  nroCuotas: number;
  precioId: number;
  precioInicial: string;
  precioFinal: string;
  fechaVenta: string | null;
  vigencia: number | null;
  comision: number | null;
  motivoCan: string | null;
  cancelBy: number | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
  employee: IEmployee | null;
  company: ICompany;
  project: IProject;
  property: IProperty;
  paymentType: IPaymentType;
  treatmentType: ITreatmentType;
}

export interface ITreatmentType {
  id: number;
  descripcion: string;
}
