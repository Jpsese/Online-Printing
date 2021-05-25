import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToprintComponent } from './admin-toprint.component';

describe('AdminToprintComponent', () => {
  let component: AdminToprintComponent;
  let fixture: ComponentFixture<AdminToprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminToprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
