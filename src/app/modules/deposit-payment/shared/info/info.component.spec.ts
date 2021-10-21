import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPaymentInfoComponent } from './info.component';

describe('DepositPaymentInfoComponent', () => {
  let component: DepositPaymentInfoComponent;
  let fixture: ComponentFixture<DepositPaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositPaymentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
