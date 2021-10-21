import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BankAccount } from '../models/bank-account';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  getAll(projectId: any, bankId: any): Observable<BankAccount[]> {
    const url = `/api/bank-accounts?project=${projectId}&bank=${bankId}`;
    return this.http
      .get<BankAccount[]>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          const data: any[] = res?.data ?? [];
          return data.map((item: any) => new BankAccount(item));
        })
      );
  }

  get(id: any, projectId: any): Observable<BankAccount> {
    const url = `/api/bank-accounts/${id}?project=${projectId}`;
    return this.http
      .get<BankAccount>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return new BankAccount(res);
        })
      );
  }
}
