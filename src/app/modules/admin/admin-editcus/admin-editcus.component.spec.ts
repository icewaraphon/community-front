import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditcusComponent } from './admin-editcus.component';

describe('AdminEditcusComponent', () => {
  let component: AdminEditcusComponent;
  let fixture: ComponentFixture<AdminEditcusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditcusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditcusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
