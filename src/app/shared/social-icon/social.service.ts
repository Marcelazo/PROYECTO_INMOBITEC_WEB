import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private hide: boolean;

  constructor() {
    this.hide = true;
  }

  get hiveValue(): boolean {
    return this.hide;
  }

  displayNone(): void {
    this.hide = true;
  }

  displayBlock(): void {
    this.hide = false;
  }
}
