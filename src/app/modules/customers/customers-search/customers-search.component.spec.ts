import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSearchComponent } from './customers-search.component';

describe('CustomersSearchComponent', () => {
  let component: CustomersSearchComponent;
  let fixture: ComponentFixture<CustomersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
