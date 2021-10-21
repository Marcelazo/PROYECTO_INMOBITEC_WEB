import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyDirective } from './digit-only.directive';
import { LettersWithSpaceDirective } from './letters-with-space.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';

@NgModule({
  declarations: [
    DigitOnlyDirective,
    LettersWithSpaceDirective,
    NumbersOnlyDirective,
  ],
  exports: [
    DigitOnlyDirective,
    LettersWithSpaceDirective,
    NumbersOnlyDirective,
  ],
  imports: [CommonModule],
})
export class DirectivesModule {}
