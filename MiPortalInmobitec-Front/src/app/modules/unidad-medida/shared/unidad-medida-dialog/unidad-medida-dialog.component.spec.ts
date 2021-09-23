import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaDialogComponent } from './unidad-medida-dialog.component';

describe('UnidadMedidaDialogComponent', () => {
  let component: UnidadMedidaDialogComponent;
  let fixture: ComponentFixture<UnidadMedidaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMedidaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
