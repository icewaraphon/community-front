import { TestBed } from '@angular/core/testing';

import { AdminmanagService } from './adminmanag.service';

describe('AdminmanagService', () => {
  let service: AdminmanagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminmanagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
