import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Articulo[]> {
    const url = `/api/all-articulo`;
    return this.http
      .get<Articulo[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Articulo(item));
        })
      );
  }


  store(data: FormData): Observable<any> {
    const url = '/api/store-articulo';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-articulo/${id}`;
    return this.http.patch(url, data);
  }

  /**
   * Update property
   */
   updateImages(id: any, data: FormData): Observable<any> {
    const url = `/api/update-img-articulos/${id}`;
    return this.http.post(url, data);
  }

  // get(id: number | string): Observable<PaymentSchedule> {
  //   const url = `/api/payment-schedules/${id}`;
  //   return this.http
  //     .get<PaymentSchedule>(url, { headers: this.headers })
  //     .pipe(
  //       map((res: any) => {
  //         return new PaymentSchedule(res);
  //       })
  //     );
  // }

  // pay(data: FormData): Observable<any> {
  //   const url = '/api/ingresos/payment-schedule';
  //   return this.http.post(url, data, { headers: this.headers }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  // update(data: FormData): Observable<any> {
  //   const url = '/api/ingresos/update-payment-schedule';
  //   return this.http.post(url, data, { headers: this.headers }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  // downloadTicket(id: any): Observable<any> {
  //   const url = `/api/payment-schedules/${id}/download-ticket`;
  //   return this.http.get(url, {
  //     headers: this.headers,
  //     observe: 'response',
  //     responseType: 'blob',
  //   });
  // }

  // downloadVoucher(fileName: string): Observable<any> {
  //   const url = `/api/payment-schedules/voucher/${fileName}`;
  //   return this.http.get(url, {
  //     headers: this.headers,
  //     observe: 'response',
  //     responseType: 'blob',
  //   });
  // }

  /**
   * Mercado Pago : generate a preference id
   */
  // generatePreference(data: any): Observable<any> {
  //   const url = '/api/payment-schedules/generate-preference';

  //   return this.http.post(url, data, { headers: this.headers }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  /**
   * Mercado Pago: approve payment
   */
  // approvePayment(data: any): Observable<any> {
  //   const url = '/api/payment-schedules/approve-payment';

  //   return this.http.post(url, data, { headers: this.headers });
  // }
}
