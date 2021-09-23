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
// import { ImageInputComponent } from './image-input/image-input.component';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MessageSnackBarComponent,
    StateBadgeComponent,
    ProgressIconComponent,
    //ImageInputComponent,
  ],
  imports: [MatIconModule],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    StateBadgeComponent,
    ProgressIconComponent,
  ],
  providers: [MenuItems],
})
export class SharedModule {}
