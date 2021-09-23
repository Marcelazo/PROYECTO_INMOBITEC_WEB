import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';

import { MenuItems } from '../../../shared/menu-items/menu-items';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class AppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number): void {
    this.parentIndex = i;
    this.childIndex = j;
  }

  subclickEvent(): void {
    this.status = true;
  }

  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public auth: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    // this.mobileQuery.addListener(this.mobileQueryListener);
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    // this.mobileQuery.removeListener(this.mobileQueryListener);
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  handleClickSignOut(): void {
    this.auth.signOut();
    setTimeout(() => {
      this.router.navigateByUrl('/auth/login');
    }, 300);
  }
}
