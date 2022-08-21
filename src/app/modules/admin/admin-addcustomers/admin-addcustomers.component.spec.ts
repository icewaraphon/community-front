import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcustomersComponent } from './admin-addcustomers.component';

describe('AdminAddcustomersComponent', () => {
  let component: AdminAddcustomersComponent;
  let fixture: ComponentFixture<AdminAddcustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddcustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
