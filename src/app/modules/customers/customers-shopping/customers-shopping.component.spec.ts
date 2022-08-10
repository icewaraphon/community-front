import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersShoppingComponent } from './customers-shopping.component';

describe('CustomersShoppingComponent', () => {
  let component: CustomersShoppingComponent;
  let fixture: ComponentFixture<CustomersShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
