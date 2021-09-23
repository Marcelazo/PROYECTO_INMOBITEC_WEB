import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoMoneda } from '../models/tipo-moneda';

@Injectable({
  providedIn: 'root',
})
export class TipoMonedaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoMoneda[]> {
    const url = `/api/all-tipoMoneda`;
    return this.http
      .get<TipoMoneda[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new TipoMoneda(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-tipoMoneda';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-tipoMoneda/${id}`;
    return this.http.patch(url, data);
  }
}
