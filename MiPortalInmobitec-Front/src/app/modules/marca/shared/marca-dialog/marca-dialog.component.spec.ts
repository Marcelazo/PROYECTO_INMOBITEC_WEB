import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDialogComponent } from './marca-dialog.component';

describe('MarcaDialogComponent', () => {
  let component: MarcaDialogComponent;
  let fixture: ComponentFixture<MarcaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
