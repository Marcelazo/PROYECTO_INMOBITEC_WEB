import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/services/auth.service';

export interface Notification {
  round: string;
  icon: string;
  title: string;
  subject: string;
  time: string;
}

export interface MyMessage {
  useravatar: string;
  status: string;
  from: string;
  subject: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    round: 'round-danger',
    icon: 'ti-link',
    title: 'Launch Admin',
    subject: 'Just see the my new admin!',
    time: '9:30 AM',
  },
  {
    round: 'round-success',
    icon: 'ti-calendar',
    title: 'Event today',
    subject: 'Just a reminder that you have event',
    time: '9:10 AM',
  },
  {
    round: 'round-info',
    icon: 'ti-settings',
    title: 'Settings',
    subject: 'You can customize this template as you want',
    time: '9:08 AM',
  },
  {
    round: 'round-primary',
    icon: 'ti-user',
    title: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM',
  },
];

const MESSAGES: MyMessage[] = [
  {
    useravatar: 'assets/images/users/1.jpg',
    status: 'online',
    from: 'Yomar Sanchez',
    subject: 'Just see the my admin!',
    time: '9:30 AM',
  },
  {
    useravatar: 'assets/images/users/2.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM',
  },
  {
    useravatar: 'assets/images/users/2.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM',
  },
  {
    useravatar: 'assets/images/users/4.jpg',
    status: 'offline',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  // This is for Notifications
  notifications: Notification[] = NOTIFICATIONS;

  // This is for Mymessages
  mymessages: MyMessage[] = MESSAGES;

  constructor(public auth: AuthService, private router: Router) {}

  handleClickSignOut(): void {
    this.auth.signOut();
    setTimeout(() => {
      this.router.navigateByUrl('/auth/login');
    }, 100);
  }
}
