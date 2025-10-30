import { TestBed } from '@angular/core/testing';

import { MonthlyServiceService } from './monthly-service.service';

describe('MonthlyServiceService', () => {
  let service: MonthlyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
