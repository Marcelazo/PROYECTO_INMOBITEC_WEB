import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
})
export class AppBlankComponent {
  socialUrl = env.social;
}
