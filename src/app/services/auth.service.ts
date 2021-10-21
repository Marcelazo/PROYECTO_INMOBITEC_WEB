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
export class AuthService {
  user: User = Object.create(null);
  private auth: Authentication = Object.create(null);

  constructor(private http: HttpClient) {
    // Load Session
    if (!(this.auth instanceof Authentication)) {
      const authSession = this.session;

      if (authSession instanceof Authentication) {
        this.user = authSession.user;
        this.auth = authSession;
      }
    }
  }

  get session(): Authentication | null {
    return Authentication.getSession();
  }

  /**
   * Get SignedIn User
   *
   * @return User | null
   */
  getSignedInUser(): User | null {
    if (this.user instanceof User) {
      return this.user;
    }

    const authSession = this.session;
    if (authSession instanceof Authentication) {
      this.user = authSession.user;
      this.auth = authSession;
      return this.user;
    }

    return null;
  }

  /**
   * Login user
   * @param data ClientAccess
   */
  signIn(data: ClientAccess): Observable<Authentication> {
    const url = `/api/auth/login`;

    return this.http.post<Authentication>(url, data).pipe(
      map((res: any) => {
        this.auth = new Authentication(res);
        this.auth.setSession();
        return this.auth;
      })
    );
  }

  /**
   * Reset user password
   * @param data any
   */
  passwordReset(data: any): Observable<User> {
    const url = '/api/auth/password-reset';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
    });

    return this.http
      .patch<User>(url, data, { headers })
      .pipe(
        map((res: any) => {
          const updatedUser = new User(res);
          this.auth.user = updatedUser;
          this.user = updatedUser;
          this.auth.setSession();
          return this.user;
        })
      );
  }

  /**
   * Logout user
   */
  signOut(): void {
    this.auth.destroySession();
    this.auth = Object.create(null);
    this.user = Object.create(null);
  }

  updateUserAuth(user: User): void {
    this.user = user;
    this.auth.user = user;
    this.auth.setSession();
  }

  check(): boolean {
    const authSession = this.session;
    if (authSession instanceof Authentication) {
      this.user = authSession.user;
      this.auth = authSession;

      return true;
    }

    return false;
  }

  hasRole(role: string): boolean {
    let authSession: any = this.auth;
    if (!(authSession instanceof Authentication)) {
      authSession = this.session;
    }

    const roles = authSession?.roles ?? [];

    return roles.includes(role);
  }

  validateRoles(roles: string[]): boolean {
    const authSession = this.session;
    if (authSession instanceof Authentication) {
      for (const role of authSession.roles) {
        if (roles.includes(role)) {
          return true;
        }
      }
    }

    return false;
  }

  get accessToken(): string {
    if (this.auth instanceof Authentication) {
      return this.auth.accessToken;
    }

    return '';
  }

  // get roles(): string[] {
  //   return this.auth?.user?.roles ?? [];
  // }
}
