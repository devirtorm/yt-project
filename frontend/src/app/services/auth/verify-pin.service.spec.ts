import { TestBed } from '@angular/core/testing';

import { VerifyPinService } from './verify-pin.service';

describe('VerifyPinService', () => {
  let service: VerifyPinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyPinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
