import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaDialogComponent } from './galeria-dialog.component';

describe('GaleriaDialogComponent', () => {
  let component: GaleriaDialogComponent;
  let fixture: ComponentFixture<GaleriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
