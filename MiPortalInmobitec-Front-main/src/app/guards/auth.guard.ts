import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.check()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    if (this.auth.user?.needToResetPassword === true) {
      this.router.navigateByUrl('/auth/password-reset');
      return false;
    }

    return true;
  }
}
