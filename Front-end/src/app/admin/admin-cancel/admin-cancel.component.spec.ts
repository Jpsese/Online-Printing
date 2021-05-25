import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCancelComponent } from './admin-cancel.component';

describe('AdminCancelComponent', () => {
  let component: AdminCancelComponent;
  let fixture: ComponentFixture<AdminCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
