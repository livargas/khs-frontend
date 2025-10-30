import { TestBed } from '@angular/core/testing';

import { AttendaceService } from './attendace-service.service';

describe('AttendaceService', () => {
  let service: AttendaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
