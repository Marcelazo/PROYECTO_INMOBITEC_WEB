import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Proveedor[]> {
    const url = `/api/all-proveedor`;
    return this.http
      .get<Proveedor[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Proveedor(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-proveedor';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-proveedor/${id}`;
    return this.http.patch(url, data);
  }
}
