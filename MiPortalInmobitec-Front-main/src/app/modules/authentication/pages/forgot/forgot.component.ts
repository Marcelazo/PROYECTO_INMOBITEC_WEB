import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { ForgotService } from 'src/app/services/forgot.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { ForgotForm } from './forgot-form';
import { PasswordForm } from './password-form';

interface ForgotData {
  document: string;
  lastname: string;
  name: string;
  user: string;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  private step = 1;

  hidePwd = true;
  hidePwdConfirm = true;

  info: {
    title: string;
    description: string;
  } = Object.create(null);

  userData: ForgotData = Object.create(null);
  forgotError: string | null = null;

  constructor(
    public forgotForm: ForgotForm,
    public passwordForm: PasswordForm,
    public forgotService: ForgotService,
    private snackBar: SnackBarService,
    private router: Router
  ) {
    this.setDefaultInfo();
  }

  ngOnInit(): void {}

  get stepValue(): number {
    return this.step;
  }

  setDefaultInfo(): void {
    this.info = {
      title: 'Recuperar contraseña',
      description: 'Ingrese sus datos para buscar su cuenta de usuario.',
    };
  }

  handleForgotPassword(ngFrmForgot: NgForm): void {
    this.forgotError = null;
    if (this.forgotForm.invalid) {
      this.snackBar.showMessage({
        type: 'warning',
        title: '¡Error!',
        description: 'Complete todos los datos requeridos.',
      });
      return;
    }

    this.forgotForm.submiting();

    this.forgotService.forgotPassword(this.forgotForm.data).subscribe(
      (res: ForgotData) => {
        this.userData = res;
        this.step = 2;
        this.info = {
          title: 'Cambiar contraseña',
          description: `${this.userData.name} ${this.userData.lastname}`,
        };

        ngFrmForgot.resetForm();
        this.forgotForm.setDefaultStatus();
      },
      (err: HttpErrorResponse) => this.handleErrors(err)
    );
  }

  handleChangePassword(ngFrmPassword: NgForm): void {
    this.forgotError = null;
    if (this.passwordForm.invalid) {
      this.snackBar.showMessage({
        type: 'warning',
        title: '¡Error!',
        description: 'Complete todos los datos requeridos.',
      });
      return;
    }

    const { password, passwordConfirm } = this.passwordForm.data;
    const data = {
      user: this.userData.user,
      password,
      password_confirmation: passwordConfirm,
    };

    this.forgotService.changePassword(data).subscribe(
      (res: any) => {
        ngFrmPassword.resetForm();
        this.passwordForm.setDefaultStatus();
        this.snackBar.showMessage({
          type: 'success',
          title: '!Exito!',
          description: res?.message ?? 'Su contraseña se ha cambiado.',
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1000);
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

    switch (this.step) {
      case 1:
        this.forgotForm.state.loading = false;
        break;
      case 2:
        this.passwordForm.state.loading = false;
        break;
    }

    switch (status) {
      case StatusCodes.BAD_REQUEST:
      case StatusCodes.UNPROCESSABLE_ENTITY:
        const desc = error?.message ?? message.description;
        this.forgotError = desc;
        message.description = desc;
        break;
    }

    this.snackBar.showMessage(message);
  }
}
