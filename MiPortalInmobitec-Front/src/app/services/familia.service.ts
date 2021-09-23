import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clase } from '../models/clase';
import { Familia } from '../models/familia';


@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Familia[]> {
    const url = `/api/all-familia`;
    return this.http
      .get<Familia[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Familia(item));
        })
      );
  }

  getClases(id:number): Observable<Clase[]> {
    const url = `/api/all-clases-id/${id}`;
    return this.http
      .get<Clase[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Clase(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-familia';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-familia/${id}`;
    return this.http.patch(url, data);
  }
}
