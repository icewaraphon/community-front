import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersPagesupplierComponent } from './customers-pagesupplier.component';

describe('CustomersPagesupplierComponent', () => {
  let component: CustomersPagesupplierComponent;
  let fixture: ComponentFixture<CustomersPagesupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersPagesupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersPagesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
