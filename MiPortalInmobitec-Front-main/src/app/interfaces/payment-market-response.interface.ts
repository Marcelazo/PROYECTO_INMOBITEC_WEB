// Mercado Pago
export interface IPaymentMarketResponse {
  payment_schedule_id: number;
  collection_id: string;
  collection_status: string;
  external_reference: string | null;
  merchant_account_id: string | null;
  merchant_order_id: string;
  payment_id: string;
  payment_type: string;
  preference_id: string;
  processing_mode: string;
  site_id: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
