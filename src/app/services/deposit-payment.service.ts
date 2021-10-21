import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentSchedule } from '../models/payment-schedule';
import { AuthService } from './auth.service';

interface PaginatedData {
  currentPage: number;
  data: PaymentSchedule[];
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  links: any;
  nextPageUrl: string;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class DepositPaymentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  all(params: any): Observable<PaymentSchedule[]> {
    const httpParams = new HttpParams({ fromObject: params });
    const url = `/api/deposit-payments?${httpParams.toString()}`;

    return this.http
      .get<PaymentSchedule[]>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          const data: any[] = res?.data ?? [];
          return data.map((item: any) => new PaymentSchedule(item));
        })
      );
  }

  allPaginate(params: any): Observable<PaginatedData> {
    const httpParams = new HttpParams({ fromObject: params });
    const url = `/api/deposit-payments?${httpParams.toString()}`;

    return this.http
      .get<PaginatedData>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          const { data, ...info } = res ?? {};
          // const data: any[] = res?.data ?? [];
          const paymentSchedules = data.map(
            (item: any) => new PaymentSchedule(item)
          );

          return {
            ...info,
            data: paymentSchedules,
          };
        })
      );
  }
}
