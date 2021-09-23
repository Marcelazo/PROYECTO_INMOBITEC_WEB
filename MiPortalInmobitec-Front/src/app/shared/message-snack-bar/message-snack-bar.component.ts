import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface MessageSnackBarData {
  type: 'error' | 'success' | 'info' | 'warning';
  title: string;
  description?: string;
  icon?: string;
}

@Component({
  selector: 'app-message-snack-bar',
  templateUrl: './message-snack-bar.component.html',
  styleUrls: ['./message-snack-bar.component.scss'],
})
export class MessageSnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: MessageSnackBarData) {}

  ngOnInit(): void {}
}
