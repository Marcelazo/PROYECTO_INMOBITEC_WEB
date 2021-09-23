import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Grupo[]> {
    const url = `/api/all-grupo`;
    return this.http
      .get<Grupo[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res[0] ?? [];
          return data.map((item: any) => new Grupo(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/store-grupo';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number | string, data: any): Observable<any> {
    const url = `/api/update-grupo/${id}`;
    return this.http.patch(url, data);
  }
}
