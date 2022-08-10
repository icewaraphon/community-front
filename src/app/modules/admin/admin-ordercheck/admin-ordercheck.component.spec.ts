import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdercheckComponent } from './admin-ordercheck.component';

describe('AdminOrdercheckComponent', () => {
  let component: AdminOrdercheckComponent;
  let fixture: ComponentFixture<AdminOrdercheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdercheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdercheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
