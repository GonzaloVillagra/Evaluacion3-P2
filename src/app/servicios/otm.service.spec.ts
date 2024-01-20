import { TestBed } from '@angular/core/testing';

import { OTMService } from './otm.service';

describe('OTMService', () => {
  let service: OTMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OTMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
