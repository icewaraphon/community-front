import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCategoryComponent } from './customers-category.component';

describe('CustomersCategoryComponent', () => {
  let component: CustomersCategoryComponent;
  let fixture: ComponentFixture<CustomersCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
