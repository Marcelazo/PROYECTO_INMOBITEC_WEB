import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  mzs(): Observable<any[]> {
    const url = '/api/properties/mzs';
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        const data: any[] = res ?? [];
        return data;
      })
    );
  }
}
