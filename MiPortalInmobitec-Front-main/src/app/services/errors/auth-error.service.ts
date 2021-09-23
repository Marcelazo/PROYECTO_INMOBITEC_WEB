import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackBarService } from '../material/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorService {
  constructor(
    private auth: AuthService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  resolve(err: HttpErrorResponse): void {
    const { status, error } = err;
    switch (status) {
      case 401:
        const message = error?.message ?? '';
        if (message === 'Unauthenticated.') {
          this.snackBar.showMessage({
            type: 'error',
            title: '¡Access Token Expired!',
            description: 'Su session ha finalizado',
          });

          this.auth.signOut();

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 200);

          // this.showAuthFailureDialog({
          //   url: err.url,
          //   error: code,
          //   error_description: error?.error_description ?? null,
          //   message: err.message,
          // });
        }
        break;
      default:
        break;
    }
  }

  // private showAuthFailureDialog(data: AuthFailureDialogData): void {
  //   const dialogRef = this.dialog.open(AuthFailureDialogComponent, { data });

  //   dialogRef.afterClosed().subscribe((redirect: string) => {
  //     if (redirect !== '' && redirect !== null) {
  //       this.router.navigateByUrl(redirect);
  //     }
  //   });
  // }
}
