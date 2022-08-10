import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersProductComponent } from './customers-product.component';

describe('CustomersProductComponent', () => {
  let component: CustomersProductComponent;
  let fixture: ComponentFixture<CustomersProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
