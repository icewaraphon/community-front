import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagAdminComponent } from './adminmanag-admin.component';

describe('AdminmanagAdminComponent', () => {
  let component: AdminmanagAdminComponent;
  let fixture: ComponentFixture<AdminmanagAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanagAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmanagAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
