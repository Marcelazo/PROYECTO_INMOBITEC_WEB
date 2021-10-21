import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

import { ResetForm } from './reset-form';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  hidePwd = true;
  hidePwdConfirm = true;

  constructor(
    public resetForm: ResetForm,
    public userService: UserService,
    private auth: AuthService,
    private snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.authUser().subscribe(
      (user: User) => {
        if (!user.needToResetPassword) {
          this.auth.signOut();
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 300);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  handleSubmitReset(ngFrmReset: NgForm): void {
    if (this.resetForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete todo los campos.',
      });
      return;
    }
    const { password, passwordConfirm } = this.resetForm.group.value;
    const data = {
      password,
      password_confirmation: passwordConfirm,
    };

    this.auth.passwordReset(data).subscribe(
      (user: User) => {
        ngFrmReset.resetForm();
        this.resetForm.state.loading = false;
        this.router.navigate(['/inicio']);
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Bienvenido a Deseo Admin!',
          description: `${user.fullName}`,
        });
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

    this.resetForm.state.loading = false;

    switch (status) {
      case StatusCodes.BAD_REQUEST:
      case StatusCodes.UNAUTHORIZED:
        message.title = '¡Error!';
        message.description = error?.message ?? 'Ah ocurrido un error!';
        break;
    }

    this.snackBar.showMessage(message);
  }
}
