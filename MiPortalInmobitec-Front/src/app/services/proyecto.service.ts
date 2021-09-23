import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  // urlIp:string='http://inmueble-backend.com';
  urlIp:string='http://54.86.129.40';
  constructor(private http: HttpClient) {}

  list(): Observable<Proyecto[]> {
    const url = `${this.urlIp}/api/proyecto/list`;
    return this.http
      .get<Proyecto[]>(url)
      .pipe(
        map((res: any) => {
          const data: any[] = res ?? [];
          return data.map((item: any) => new Proyecto(item));
        })
      );
  }

  store(data: FormData): Observable<any> {
    const url = '/api/proyecto/store';
    return this.http.post(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id?: number | string, data?: any): Observable<any> {
    const url = `/api/proyecto/update/${id}`;
    return this.http.post(url, data);
  }

  updateImages(id: any, data: FormData): Observable<any> {
    const url = `/api/proyecto/update-img-articulos/${id}`;
    return this.http.post(url, data);
  }

  file_logo(img_logo:string){
    const url = `${this.urlIp}/storage/imgs/proyecto/logo/${img_logo}`;
    return url;

  }

  file_principal(img_logo:string){
    const url = `${this.urlIp}/storage/imgs/proyecto/principal/${img_logo}`;
    return url;

  }


}
