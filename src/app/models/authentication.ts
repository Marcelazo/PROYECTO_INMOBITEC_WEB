import { IAuthentication } from '../interfaces/authentication.interface';
import { User } from './user';

export class Authentication {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  scope: string | null;
  user: User;
  roles: string[];

  constructor(auth: IAuthentication) {
    this.accessToken = auth?.access_token ?? '';
    this.tokenType = auth?.token_type ?? 'Bearer';
    this.expiresAt = auth?.expires_at ?? '';
    this.scope = auth?.scope ?? null;
    this.user = new User(auth.user);
    this.roles = auth?.roles ?? [];
  }

  /**
   * Get session from local storage ['__session']
   *
   * @returns An Authentication instance or null
   */
  static getSession(): Authentication | null {
    const session = localStorage.getItem('__session');
    if (session === undefined || session === null || session === '') {
      return null;
    }

    return new Authentication(JSON.parse(session));
  }

  /**
   * Set session to localStorage ['roles', 'token', '__session']
   */
  setSession(): void {
    localStorage.setItem('roles', JSON.stringify(this.roles));
    localStorage.setItem('token', this.accessToken);
    localStorage.setItem('__session', this.toStorage());
  }

  /**
   * Remove session from local storage
   */
  destroySession(): void {
    localStorage.removeItem('roles');
    localStorage.removeItem('token');
    localStorage.removeItem('__session');
    localStorage.clear();
  }

  toStorage(): string {
    return JSON.stringify(this.toJson());
  }

  toJson(): IAuthentication {
    return {
      access_token: this.accessToken,
      token_type: this.tokenType,
      expires_at: this.expiresAt,
      scope: this.scope,
      user: this.user.toJson(),
      roles: this.roles,
    };
  }
}
