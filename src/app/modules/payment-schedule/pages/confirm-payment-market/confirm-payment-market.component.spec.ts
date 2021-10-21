import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentMarketComponent } from './confirm-payment-market.component';

describe('ConfirmPaymentMarketComponent', () => {
  let component: ConfirmPaymentMarketComponent;
  let fixture: ComponentFixture<ConfirmPaymentMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPaymentMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPaymentMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
