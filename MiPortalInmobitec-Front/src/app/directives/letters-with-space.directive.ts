import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersWithSpace]',
})
export class LettersWithSpaceDirective {
  constructor(private el: ElementRef) {}

  // @HostListener('keydown', ['$event'])
  // onKeyDown(e: KeyboardEvent): any {
  //   console.log('keydown', e);
  //   const initalValue = this.el.nativeElement.value;
  //   this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z\s]*/g, '');
  //   if (initalValue !== this.el.nativeElement.value) {
  //     e.stopPropagation();
  //   }
  // }

  @HostListener('input', ['$event'])
  onInputChange(e: InputEvent): void {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z\s]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      e.stopPropagation();
    }
  }
}
