import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Marca[]> {
    const url = `/api/all-marca`;
    return this.http
      .get<Marca[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Marca(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-marca';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-marca/${id}`;
    return this.http.patch(url, data);
  }
}
