import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MessageSnackBarComponent,
  MessageSnackBarData,
} from 'src/app/shared/message-snack-bar/message-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  show(data: MessageSnackBarData, duration = 3000): void {
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      panelClass: `snack-bar-${data.type}`,
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data,
    });
  }

  showMessage(data: MessageSnackBarData, duration = 3000): void {
    this.snackBar.openFromComponent(MessageSnackBarComponent, {
      panelClass: `snack-bar-${data.type}`,
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data,
    });
  }
}
