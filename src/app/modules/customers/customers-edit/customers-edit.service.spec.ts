import { TestBed } from '@angular/core/testing';

import { CustomersEditService } from './customers-edit.service';

describe('CustomersEditService', () => {
  let service: CustomersEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
