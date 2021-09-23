import { ICompany } from '../interfaces/company.interface';
import { ICustomer } from '../interfaces/customer.interface';
import { IEmployee } from '../interfaces/employee.interface';
import { IPaymentType } from '../interfaces/payment-type.interface';
import { IPreSale, ITreatmentType } from '../interfaces/pre-sale.interface';
import { IProject } from '../interfaces/project.interface';
import { IProperty } from '../interfaces/property.interface';
import { StateBadge } from '../interfaces/state-badge.interface';

export const PRESALE_STATUSES: StateBadge[] = [
  {
    id: 0,
    type: 'primary',
    description: 'Disponible',
  },
  {
    id: 1,
    type: 'warning',
    description: 'Separado',
  },
  {
    id: 2,
    type: 'info',
    description: 'Pre Contrato',
  },
  {
    id: 3,
    type: 'success',
    description: 'Adjudicado',
  },
];

export class PreSale {
  id: number;
  customerId: number;
  supplierId: number;
  companyId: number;
  projectId: number;
  propertyId: number;
  paymentTypeId: number;
  treatmentTypeId: number;
  priceTypeId: number;

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

  // Download Pdf Status
  downloadStatus = false;

  constructor(data: IPreSale) {
    this.id = data.id;
    this.customerId = data.clienteId;
    this.supplierId = data.empleadoId;
    this.companyId = data.empresaId;
    this.projectId = data.proyectoId;
    this.propertyId = data.inmuebleId;
    this.paymentTypeId = data.tipoPagoId;
    this.treatmentTypeId = data.tipoTrataId;
    this.priceTypeId = data.tipoPrecioId;

    this.fechaIniPago = data?.fechaIniPago ?? null; // string | null;
    this.estado = data?.estado ?? 0; // number;
    this.conCasa = data?.conCasa ?? null; // number | null;
    this.fechaConCasa = data?.fechaConCasa ?? null; // string | null;
    this.diaPagoId = data?.diaPagoId ?? null; // number | null;
    this.nroCuotas = data?.nroCuotas ?? 0; // number;
    this.precioId = data?.precioId ?? 1; // number;
    this.precioInicial = data?.precioInicial; // string;
    this.precioFinal = data?.precioFinal; // string;
    this.fechaVenta = data?.fechaVenta ?? null; // string | null;
    this.vigencia = data?.vigencia ?? null; // number | null;
    this.comision = data?.comision ?? null; // number | null;
    this.motivoCan = data?.motivoCan ?? null; // string | null;
    this.cancelBy = data?.cancelBy ?? null; // number | null;
    this.cancelledAt = data?.cancelledAt ?? null; // string | null;
    this.createdAt = data?.createdAt ?? ''; // string;
    this.updatedAt = data?.updatedAt ?? ''; // string;
    this.customer = data?.customer; // ICustomer;
    this.employee = data?.employee ?? null; // IEmployee | null;
    this.company = data?.company; // ICompany;
    this.project = data?.project; // IProject;
    this.property = data?.property; // IProperty;
    this.paymentType = data?.paymentType; // IPaymentType;
    this.treatmentType = data?.treatmentType; // ITreatmentType;
  }

  get fullNameEmployee(): string {
    if (this.employee === null) {
      return '';
    }
    const name = `${this.employee?.nombre}`;
    const lastname = `${this.employee?.apePat} ${this.employee?.apeMat}`;
    return `${name}, ${lastname}`;
  }

  get propertyTitle(): string {
    return `MZ: ${this.property.manzana} LT: ${this.property.lote}`.trim();
  }

  get propertyState(): string {
    let state = 'No Definido';
    switch (this.property?.estado) {
      case 0:
        state = 'Disponible';
        break;
      case 1:
        state = 'Separado';
        break;
      case 2:
        state = 'Pre Contrato';
        break;
      case 3:
        state = 'Vendido';
        break;
    }

    return state;
  }

  /**
   * Get State Badge
   */
  get stateBadge(): StateBadge {
    if (this.property?.estado === null || this.property?.estado > 3) {
      return PRESALE_STATUSES[0];
    }

    return PRESALE_STATUSES[this.property?.estado];
  }
}
