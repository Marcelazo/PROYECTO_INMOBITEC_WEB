import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiveDialogComponent } from './motive-dialog.component';

describe('MotiveDialogComponent', () => {
  let component: MotiveDialogComponent;
  let fixture: ComponentFixture<MotiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
