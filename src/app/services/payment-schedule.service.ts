import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentSchedule } from '../models/payment-schedule';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentScheduleService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  getAll(preSaleId: number | string): Observable<PaymentSchedule[]> {
    const url = `/api/payment-schedules?pre-sale=${preSaleId}`;
    return this.http
      .get<PaymentSchedule[]>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          const data: any[] = res?.data ?? [];
          return data.map((item: any) => new PaymentSchedule(item));
        })
      );
  }

  get(id: number | string): Observable<PaymentSchedule> {
    const url = `/api/payment-schedules/${id}`;
    return this.http
      .get<PaymentSchedule>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return new PaymentSchedule(res);
        })
      );
  }

  pay(data: FormData): Observable<any> {
    const url = '/api/ingresos/payment-schedule';
    return this.http.post(url, data, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(data: FormData): Observable<any> {
    const url = '/api/ingresos/update-payment-schedule';
    return this.http.post(url, data, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  downloadTicket(id: any): Observable<any> {
    const url = `/api/payment-schedules/${id}/download-ticket`;
    return this.http.get(url, {
      headers: this.headers,
      observe: 'response',
      responseType: 'blob',
    });
  }

  downloadVoucher(fileName: string): Observable<any> {
    const url = `/api/payment-schedules/voucher/${fileName}`;
    return this.http.get(url, {
      headers: this.headers,
      observe: 'response',
      responseType: 'blob',
    });
  }

  /**
   * Mercado Pago : generate a preference id
   */
  generatePreference(data: any): Observable<any> {
    const url = '/api/payment-schedules/generate-preference';

    return this.http.post(url, data, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Mercado Pago: approve payment
   */
  approvePayment(data: any): Observable<any> {
    const url = '/api/payment-schedules/approve-payment';

    return this.http.post(url, data, { headers: this.headers });
  }

  /**
   * Total de depósitos y/o transferencias
   */
  totalDeposits(): Observable<any> {
    const url = '/api/payment-schedules/total-deposits';
    return this.http.get(url, { headers: this.headers });
  }
}
