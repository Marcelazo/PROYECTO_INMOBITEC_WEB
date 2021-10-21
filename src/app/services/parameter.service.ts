import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { IParameter } from '../interfaces/parameter.interface';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  all(code: string): Observable<IParameter[]> {
    const url = `/api/parameters?code=${code}`;
    return this.http
      .get<IParameter[]>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return res?.data ?? [];
        })
      );
  }

  grouped(code: string): Observable<any> {
    const url = `/api/parameters/grouped?code=${code}`;
    return this.http.get(url, { headers: this.headers });
  }
}
