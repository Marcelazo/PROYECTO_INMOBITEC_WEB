import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Ubigeo } from '../interfaces/ubigeo.interface';

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  //private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.httpHeaders = new HttpHeaders({
    //   Authorization: 'Bearer ' + this.authService.accessToken,
    // });
  }

  getDepartments(): Observable<Ubigeo[]> {
    const url = '/api/ubigeo/ubigeo?type=1';
    return this.http
      .get<Ubigeo[]>(url)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getProvinces(department: any): Observable<Ubigeo[]> {
    const url = `/api/ubigeo/ubigeo?type=2&department=${department}`;
    return this.http
      .get<Ubigeo[]>(url)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getDistricts(department: any, province: any): Observable<Ubigeo[]> {
    const url = `/api/ubigeo/ubigeo?type=3&department=${department}&province=${province}`;
    return this.http
      .get<Ubigeo[]>(url)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
