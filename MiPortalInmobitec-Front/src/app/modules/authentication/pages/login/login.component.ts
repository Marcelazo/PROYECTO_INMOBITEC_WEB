import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { StatusCodes } from 'http-status-codes';
import { Authentication } from 'src/app/models/authentication';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { LoginForm } from './login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  invalidGrant = false;

  constructor(
    public loginForm: LoginForm,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleDoLogin(ngFrmLogin: NgForm): void {
    if (this.loginForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete y corriga los errores.',
      });
      return;
    }

    this.loginForm.submiting();

    this.authService.signIn(this.loginForm.data).subscribe(
      (auth: Authentication) => {
        this.invalidGrant = false;
        this.loginForm.defaultStatus();
        ngFrmLogin.resetForm();

        // if (auth.user.needToResetPassword) {
        //   this.router.navigate(['/auth/password-reset']);
        // } else {
          this.router.navigate(['/inicio']);
          this.snackBar.showMessage({
            type: 'success',
            title: '¡Bienvenido!',
            description: ``,
          });
        //}
      },
      (err: HttpErrorResponse) => this.handleErrors(err)
    );
  }

  private handleErrors(err: HttpErrorResponse): void {
    const { error, status } = err;
    const message: any = {
      type: 'error',
      title: '¡Error!',
      description: 'Ah ocurrido un error!',
    };

    this.loginForm.defaultStatus();

    switch (status) {
      case StatusCodes.BAD_REQUEST:
      case StatusCodes.UNAUTHORIZED:
        this.invalidGrant = true;
        message.title = 'Login Error!';
        message.description =
          error?.message ?? 'Usuario y/o contraseña son invalidos!';
        break;
    }

    this.snackBar.showMessage(message);
  }
}
