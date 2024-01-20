import { TestBed } from '@angular/core/testing';

import { DataDestinoService } from './data-destino.service';

describe('DataDestinoService', () => {
  let service: DataDestinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDestinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
