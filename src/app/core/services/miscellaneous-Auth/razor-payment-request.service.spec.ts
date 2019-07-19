import { TestBed } from '@angular/core/testing';

import { RazorPaymentRequestService } from './razor-payment-request.service';

describe('RazorPaymentRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RazorPaymentRequestService = TestBed.get(RazorPaymentRequestService);
    expect(service).toBeTruthy();
  });
});
