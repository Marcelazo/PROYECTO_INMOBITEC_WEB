import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Grupo } from '../models/t';

@Injectable({
  providedIn: 'root',
})
export class TipoPersonaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const url = `/api/all-tipo-persona`;
    return this.http
      .get<any[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          // return data.map((item: any) => new Grupo(item));
          return data;
        })
      );
  }
}
