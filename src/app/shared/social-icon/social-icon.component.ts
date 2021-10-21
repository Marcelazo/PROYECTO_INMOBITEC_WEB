import { Component, Input, OnInit } from '@angular/core';
import { SocialService } from './social.service';

@Component({
  selector: 'app-social-icon',
  templateUrl: './social-icon.component.html',
  styleUrls: ['./social-icon.component.scss'],
})
export class SocialIconComponent implements OnInit {
  @Input() url = '#';

  constructor(public socialService: SocialService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.socialService.displayBlock();
    }, 2000);

    setTimeout(() => {
      this.socialService.displayNone();
    }, 10000);
  }
}
