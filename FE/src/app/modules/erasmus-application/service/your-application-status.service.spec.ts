import { TestBed } from '@angular/core/testing';

import { YourApplicationStatusService } from './your-application-status.service';

describe('YourApplicationStatusService', () => {
  let service: YourApplicationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourApplicationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
