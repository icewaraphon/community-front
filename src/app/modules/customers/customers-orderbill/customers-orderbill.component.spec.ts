import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOrderbillComponent } from './customers-orderbill.component';

describe('CustomersOrderbillComponent', () => {
  let component: CustomersOrderbillComponent;
  let fixture: ComponentFixture<CustomersOrderbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersOrderbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersOrderbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
