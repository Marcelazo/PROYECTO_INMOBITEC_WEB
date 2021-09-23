import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScheduleListComponent } from './payment-schedule-list.component';

describe('PaymentScheduleListComponent', () => {
  let component: PaymentScheduleListComponent;
  let fixture: ComponentFixture<PaymentScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentScheduleListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
