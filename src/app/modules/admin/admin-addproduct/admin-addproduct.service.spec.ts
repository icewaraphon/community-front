import { TestBed } from '@angular/core/testing';

import { AdminAddproductService } from './admin-addproduct.service';

describe('AdminAddproductService', () => {
  let service: AdminAddproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
