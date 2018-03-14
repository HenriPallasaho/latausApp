import { TestBed, inject } from '@angular/core/testing';

import { OpenChargeService } from './open-charge.service';

describe('OpenChargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenChargeService]
    });
  });

  it('should be created', inject([OpenChargeService], (service: OpenChargeService) => {
    expect(service).toBeTruthy();
  }));
});
