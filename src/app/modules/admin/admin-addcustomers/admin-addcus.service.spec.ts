import { TestBed } from '@angular/core/testing';

import { AdminAddcusService } from './admin-addcus.service';

describe('AdminAddcusService', () => {
  let service: AdminAddcusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddcusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
