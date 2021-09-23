import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clase } from '../models/clase';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Clase[]> {
    const url = `/api/all-clase`;
    return this.http
      .get<Clase[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Clase(item));
        })
      );
  }

  getGrupos(id:number): Observable<Grupo[]> {
    const url = `/api/all-grupos-id/${id}`;
    return this.http
      .get<Grupo[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Grupo(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-clase';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-clase/${id}`;
    return this.http.patch(url, data);
  }
}
