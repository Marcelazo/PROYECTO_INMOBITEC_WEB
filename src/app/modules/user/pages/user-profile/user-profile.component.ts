import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/material/snack-bar.service';
import { User } from 'src/app/models/user';
import { PasswordForm } from './password-form';
import { UserForm } from './user-form';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Parameter {
  id: number;
  descripcion: string | null;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User = Object.create(null);
  startDate = new Date();
  formAvatar: FormGroup = Object.create(null);

  // Password form
  hidePwdLast = true;
  hidePwd = true;
  hidePwdConfirm = true;

  documentTypes: Parameter[] = [];
  civilStatus: Parameter[] = [];
  //district: Parameter[] = [];

  constructor(
    public userForm: UserForm,
    public passwordForm: PasswordForm,
    private userService: UserService,
    private auth: AuthService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder
  ) {
    // this.authUser = this.authService.getSignedInUser() as Person;
    this.updateFormAvatar();
  }

  ngOnInit(): void {
    // this.userForm.setData(this.authUser);
    this.loadData();
    this.loadParameters();
  }

  /**
   * Get user information
   */
  private loadData(): void {
    this.userService.authUser().subscribe(
      (res: User) => {
        this.user = res;
        this.userForm.setData(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * Get parameters for user
   */
  private loadParameters(): void {
    this.userService.parameters().subscribe(
      (res: any) => {
        console.log(res);
        this.documentTypes = res?.documentTypes
          ? (res.documentTypes as Parameter[])
          : [];
        this.civilStatus = res?.civilStatus
          ? (res.civilStatus as Parameter[])
          : [];
        //this.district = res?.district
        //? (res.district as Parameter[])
        //: [];
      },
      (err) => {
        console.error(err);
      }
    );
  }

  handleSubmitUserData(): void {
    if (this.userForm.invalid) {
      this.snackBar.showMessage({
        type: 'warning',
        title: '¡Error!',
        description: 'Complete todos los datos requeridos.',
      });
      return;
    }

    const {
      name,
      fatherSurname,
      motherSurname,
      documentType,
      document,
      cellphone,
      email,
      civilStatus,
      address,
      reference,
      //district,
    } = this.userForm.group.value;

    const data = {
      name,
      fatherSurname,
      motherSurname,
      documentType,
      document,
      email,
      cellphone,
      // phone,
      civilStatus,
      address,
      reference,
      //district,
      // employee,
    };

    this.userForm.submiting();

    this.userService.update(this.auth.user.id, data).subscribe(
      (res: any) => {
        this.userForm.defaultStatus();
        this.snackBar.showMessage({
          type: 'success',
          title: '¡Exito!',
          description: 'Tus datos se ha actualizado corractamente.',
        });
      },
      (err) => {
        console.error(err);
        this.userForm.defaultStatus();
        this.snackBar.showMessage({
          type: 'error',
          title: '¡Error!',
          description: 'Ha ocurrido un error, intente nuevamente.',
        });
      }
    );
  }

  handleSubmitUserPassword(ngFormPassword: NgForm): void {
    if (this.passwordForm.invalid) {
      this.snackBar.showMessage({
        type: 'error',
        title: '¡Error!',
        description: 'Complete los campos requeridos.',
      });
      return;
    }

    const {
      lastPassword,
      password,
      passwordConfirm,
    } = this.passwordForm.group.value;

    const data = {
      password: lastPassword,
      new_password: password,
      new_password_confirmation: passwordConfirm,
    };

    this.passwordForm.submiting();

    this.userService.changePassword(data).subscribe(
      (_: any) => {
        this.passwordForm.defaultStatus();
        ngFormPassword.resetForm();
        this.snackBar.showMessage({
          type: 'success',
          title: 'Éxito',
          description: 'Se Actualizo tu contraseña correctamente!!!',
        });
      },
      (err: HttpErrorResponse) => {
        const error = err.error;
        const description =
          error?.message ?? 'Ah ocurrido un error, intente nuevamente.';

        this.passwordForm.defaultStatus();

        this.snackBar.showMessage({
          type: 'error',
          title: 'Error!',
          description,
        });
      }
    );
  }

  handleChageInputFile(event: any): void {
    const files = event?.target?.files ?? new FileList();

    if (files && files[0]) {
      this.formAvatar.patchValue({
        avatar: files[0],
      });
    }
  }

  updateFormAvatar(): void {
    this.formAvatar = this.formBuilder.group({
      image: [null, Validators.required],
      avatar: [null, Validators.required],
    });
  }

  handleUpdateAvatar(ngFrmAvatar: NgForm): void {
    const { avatar } = this.formAvatar.value;
    const data = new FormData();
    data.append('avatar', avatar);
    this.userService.updateAvatar(data).subscribe(
      (user: User) => {
        this.auth.updateUserAuth(user);
        ngFrmAvatar.resetForm();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
