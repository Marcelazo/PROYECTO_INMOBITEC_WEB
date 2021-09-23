import { IPaymentSchedule } from '../interfaces/payment-schedule.interface';
import { StateBadge } from '../interfaces/state-badge.interface';
import { PreSale } from './pre-sale';
import { environment as env } from 'src/environments/environment';
import { PaymentType } from './payment-type';

export const STATE_BADGES: StateBadge[] = [
  {
    id: 0,
    type: 'light-danger',
    description: 'Pendiente',
  },
  {
    id: 1,
    type: 'success',
    description: 'Aprobado',
  },
  {
    id: 2,
    type: 'warning',
    description: 'Por Revisar',
  },
  {
    id: 3,
    type: 'danger',
    description: 'Rechazado',
  },
  {
    id: 4,
    type: 'light-success',
    description: 'En Proceso',
  },
  {
    id: 5,
    type: 'warning',
    description: 'Por Revisar',
  },
];

export class PaymentSchedule {
  id: number;
  ticket: any;
  preVentaId: number;
  preSale: PreSale | null;
  fechaPago: string;
  monto: string;
  estado: number;
  nroCuota: number;
  createdAt: string;
  updatedAt: string;

  canPay = false;
  allowedStates: number[] = [0, 1, 2, 3, 4, 5];

  // Btn Download Status
  downloadStatus = false;

  constructor(data: IPaymentSchedule) {
    this.id = data?.id;
    this.ticket = data?.ticket;
    this.preVentaId = data?.preVentaId;
    this.preSale =
      data?.preSale !== undefined &&
      data?.preSale !== null &&
      typeof data.preSale === 'object'
        ? new PreSale(data.preSale)
        : null;
    this.fechaPago = data?.fechaPago ?? '';
    this.monto = data?.monto ?? '0.00';
    this.estado = data?.estado ?? 0;
    this.nroCuota = data?.nroCuota;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  get ticketCode(): string | null {
    if (!this.isApproved || this.ticket === undefined || this.ticket === null) {
      return null;
    }

    const document = `${this.ticket?.serieDoc ?? ''} - ${
      this.ticket?.nroDoc ?? ''
    }`;

    return document.trim() !== '-' ? document : '';
  }

  /**
   * Check si el estado está en pendiente
   * @returns boolean
   */
  get isPending(): boolean {
    return this.estado === 0;
  }

  /**
   * Check si el estado ha sido aprobado
   * @returns boolean
   */
  get isApproved(): boolean {
    return (
      this.estado === 1 && this.ticket !== undefined && this.ticket !== null
    );
  }

  /**
   * Check si el estado esta por revisar
   * - 2 Estado por revisar de pago por depósito
   * - 5 Estado por revisar de pago por Mercado Pago
   *
   * @returns boolean
   */
  get isToReview(): boolean {
    return this.estado === 2 || this.estado === 5;
  }

  /**
   * Check si el estado es rechazado
   * @returns boolean
   */
  get isRejected(): boolean {
    return this.estado === 3;
  }

  /**
   * Check si el estado esta en proceso
   * @returns boolean
   */
  get isInProcess(): boolean {
    return this.estado === 4;
  }

  /**
   * Check si el pago se puede actualizar
   * @returns boolean
   */
  get canUpdate(): boolean {
    // Estado Rechazado || Estado Por Revisar
    return this.estado === 3 || this.estado === 2;
  }

  /**
   * Actualiza la propiedad canPay
   * @returns boolean
   */
  updateCanPay(): boolean {
    this.canPay = this.isPending || !this.allowedStates.includes(this.estado);
    return this.canPay;
  }

  /**
   * Evalua si el pago se puede editar según su estado
   * @returns boolean
   */
  get canEditPay(): boolean {
    if (this.ticket) {
      switch (this.ticket?.tipoPagoId) {
        case PaymentType.deposit:
          return (
            (this.estado === 3 || this.estado === 2) &&
            this.ticket?.numRechazo <= 3
          );
          break;
      }
    }

    return false;
  }

  get canDownloadTicket(): boolean {
    if (
      this.estado === 1 &&
      this.ticket !== undefined &&
      this.ticket !== null
    ) {
      return this.ticket?.ticket !== undefined &&
        this.ticket?.ticket !== null &&
        this.ticket?.ticket !== ''
        ? true
        : false;
    }

    return false;
  }

  get voucherUrl(): string {
    let url = '';
    if (this.ticket) {
      url = `${env.url}/vouchers/${this.ticket.voucher}`;
    }

    return url;
  }

  /**
   * Get State Badge
   */
  get stateBadge(): StateBadge {
    if (this.estado === null || !this.allowedStates.includes(this.estado)) {
      return STATE_BADGES[0];
    }

    return STATE_BADGES[this.estado];
  }
}
