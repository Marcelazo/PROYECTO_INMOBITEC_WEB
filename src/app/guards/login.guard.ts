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
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.check()) {
      if (this.auth.user?.needToResetPassword === true) {
        this.router.navigateByUrl('/auth/password-reset');
        return false;
      } else {
        this.router.navigateByUrl('/inicio');
        return false;
      }
    }

    return true;
  }
}
