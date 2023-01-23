import { TestBed } from '@angular/core/testing';

import { NormalserviceService } from './normalservice.service';

describe('NormalserviceService', () => {
  let service: NormalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
