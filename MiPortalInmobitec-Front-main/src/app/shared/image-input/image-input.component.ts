import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventCancelImage, EventChangeImage } from './image-input';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  @Input() id = 0;

  @Input() wrapper = 'wrapper';

  @Input() srcImage: File | string | null = null;

  @Input() state = '';

  @Output()
  changeImage: EventEmitter<EventChangeImage> = new EventEmitter<EventChangeImage>();

  @Output()
  cancelImage: EventEmitter<EventCancelImage> = new EventEmitter<EventCancelImage>();

  @ViewChild('image')
  public imageElementRef!: ElementRef;

  bgImage = '';
  defaultBgImage = '/assets/images/background/weatherbg.jpg';

  imageInputState = '';

  constructor() {
    this.setBackground(this.defaultBgImage);
   }

  ngOnInit(): void {
    if (this.srcImage !== null) {
      this.loadSrcImage(this.srcImage);
    }
  }

  handleChageInputFile(event: any): void {
    const files = event?.target?.files ?? new FileList();

    if (files && files[0]) {
      this.loadSrcImage(files[0]);
      this.changeImage.emit({
        id: this.id,
        file: files[0],
      });
    } else {
      this.imageInputState = '';
    }
  }

  handleClickCancel(e: MouseEvent): void {
    e.preventDefault();
    const input = this.imageElementRef.nativeElement;
    this.cancelImage.emit({
      id: this.id,
      state: this.state,
    });
    this.imageInputState = '';
    // removeClass(the.element, 'image-input-changed');
    // removeClass(the.element, 'image-input-empty');

    if (this.srcImage !== null) {
      this.loadSrcImage(this.srcImage);
    } else {
      this.setBackground(this.defaultBgImage);
    }

    if (input) {
      input.value = '';
      // the.hidden.value = '0';
    }
  }

  private loadSrcImage(src: File | string): void {
    if (src instanceof File) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.setBackground(e.target.result);
      };
      reader.readAsDataURL(src);
      this.imageInputState = 'image-input-changed';
      // addClass(the.element, 'image-input-changed');
      // removeClass(the.element, 'image-input-empty');
    } else {
      this.imageInputState = 'image-input-changed';
      this.setBackground(src);
    }
  }

  private setBackground(url: string): void {
    this.bgImage = `background-image: url(${url})`;
  }

}
