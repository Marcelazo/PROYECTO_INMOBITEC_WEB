import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPaymentListComponent } from './list.component';

describe('DepositPaymentListComponent', () => {
  let component: DepositPaymentListComponent;
  let fixture: ComponentFixture<DepositPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepositPaymentListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
