import { TestBed } from '@angular/core/testing';

import { VansalesService } from './vansales.service';

describe('VansalesService', () => {
  let service: VansalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VansalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
