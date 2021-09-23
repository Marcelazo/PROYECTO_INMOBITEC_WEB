import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaymentFormComponent } from './fee-payment-form.component';

describe('FeePaymentFormComponent', () => {
  let component: FeePaymentFormComponent;
  let fixture: ComponentFixture<FeePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeePaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
