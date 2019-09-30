import { TestBed } from '@angular/core/testing';

import { AngularPaymentPaytmService } from './angular-payment-paytm.service';

describe('AngularPaymentPaytmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularPaymentPaytmService = TestBed.get(AngularPaymentPaytmService);
    expect(service).toBeTruthy();
  });
});
