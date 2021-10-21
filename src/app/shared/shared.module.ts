import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
} from './accordion';
import { MessageSnackBarComponent } from './message-snack-bar/message-snack-bar.component';
import { StateBadgeComponent } from './state-badge/state-badge.component';
import { ProgressIconComponent } from './progress-icon/progress-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { SocialIconComponent } from './social-icon/social-icon.component';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MessageSnackBarComponent,
    StateBadgeComponent,
    ProgressIconComponent,
    SocialIconComponent,
  ],
  imports: [MatIconModule],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    StateBadgeComponent,
    ProgressIconComponent,
    SocialIconComponent,
  ],
  providers: [MenuItems],
})
export class SharedModule {}
