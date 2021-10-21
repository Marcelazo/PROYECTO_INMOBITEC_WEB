import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
      Accept: 'application/json',
    });
  }

  authUser(): Observable<User> {
    const url = `/api/auth/user`;
    return this.http
      .get<User>(url, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return new User(res);
        })
      );
  }

  parameters(): Observable<any> {
    const url = `/api/users/parameters`;
    return this.http.get(url, { headers: this.headers });
  }

  update(id: any, data: any): Observable<any> {
    const url = `/api/users/${id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changePassword(data: any): Observable<any> {
    const url = `/api/users/change-password`;
    return this.http.post(url, data, { headers: this.headers });
  }

  updateAvatar(data: any): Observable<User> {
    const url = `/api/users/update-avatar`;
    return this.http
      .post<User>(url, data, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return new User(res);
        })
      );
  }
}
