import { TestBed } from '@angular/core/testing';

import { CrystalReportService } from './crystal-report.service';

describe('CrystalReportService', () => {
  let service: CrystalReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrystalReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
