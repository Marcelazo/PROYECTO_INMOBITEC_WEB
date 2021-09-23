import { IPaymentMarketResponse } from '../interfaces/payment-market-response.interface';

export class PaymentMarketResponse {
  paymentScheduleId: number;
  collectionId: string;
  collectionStatus: string;
  externalReference: string | null;
  merchantAccountId: string | null;
  merchantOrderId: string;
  paymentId: string;
  paymentType: string;
  preferenceId: string;
  processingMode: string;
  siteId: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: IPaymentMarketResponse) {
    this.paymentScheduleId = data.payment_schedule_id;
    this.collectionId = data?.collection_id ?? '';
    this.collectionStatus = data?.collection_status ?? '';
    this.externalReference = data?.external_reference ?? null;
    this.merchantAccountId = data?.merchant_account_id ?? null;
    this.merchantOrderId = data?.merchant_order_id ?? '';
    this.paymentId = data?.payment_id ?? '';
    this.paymentType = data?.payment_type ?? '';
    this.preferenceId = data?.preference_id ?? '';
    this.processingMode = data?.processing_mode ?? '';
    this.siteId = data?.site_id ?? '';
    this.status = data?.status ?? '';
    this.createdAt =
      data?.created_at !== undefined &&
      data?.created_at !== null &&
      data?.created_at !== ''
        ? data.created_at
        : new Date().toUTCString();
    this.updatedAt =
      data?.updated_at !== undefined &&
      data?.updated_at !== null &&
      data?.updated_at !== ''
        ? data.updated_at
        : new Date().toUTCString();
  }

  toJson(): { [key: string]: any } {
    return {
      paymentScheduleId: this.paymentScheduleId,
      collectionId: this.collectionId,
      collectionStatus: this.collectionStatus,
      externalReference: this.externalReference,
      merchantAccountId: this.merchantAccountId,
      merchantOrderId: this.merchantOrderId,
      paymentId: this.paymentId,
      paymentType: this.paymentType,
      preferenceId: this.preferenceId,
      processingMode: this.processingMode,
      siteId: this.siteId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
