import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreSale } from '../models/pre-sale';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PreSaleService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  getAll(): Observable<PreSale[]> {
    const url = '/api/pre-sales';
    return this.http
      .get<PreSale[]>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          const data: any[] = res?.data ?? [];
          return data.map((item: any) => new PreSale(item));
        })
      );
  }

  total(): Observable<any> {
    const url = '/api/pre-sales/total';
    return this.http.get(url, { headers: this.headers });
  }

  get(id: number | string): Observable<PreSale> {
    const url = `/api/pre-sales/${id}`;
    return this.http
      .get<PreSale>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return new PreSale(res);
        })
      );
  }

  update(id: string, data: any): Observable<any> {
    const url = `/factura/?id=${id}`;
    return this.http.patch(url, data, { headers: this.headers });
  }

  downloadPaymentSchedules(id: any): Observable<any> {
    const url = `/api/pre-sales/${id}/payment-schedules`;
    return this.http.get(url, {
      headers: this.headers,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
