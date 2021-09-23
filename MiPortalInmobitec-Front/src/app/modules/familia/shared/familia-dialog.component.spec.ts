import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaDialogComponent } from './familia-dialog.component';

describe('FamiliaDialogComponent', () => {
  let component: FamiliaDialogComponent;
  let fixture: ComponentFixture<FamiliaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
