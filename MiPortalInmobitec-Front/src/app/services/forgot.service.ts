import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientAccess } from '../interfaces/authentication.interface';
import { Authentication } from '../models/authentication';
// import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  constructor(private http: HttpClient) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  /**
   * Forgot user password
   * @param data any
   */
  forgotPassword(data: any): Observable<any> {
    const url = '/api/auth/forgot-password';
    return this.http.post(url, data, { headers: this.headers });
  }

  /**
   * Reset user password
   * @param data any
   */
  changePassword(data: any): Observable<any> {
    const url = '/api/auth/change-password';
    return this.http.post(url, data, { headers: this.headers });
  }
}
