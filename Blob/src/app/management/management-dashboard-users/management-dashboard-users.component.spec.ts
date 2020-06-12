import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDashboardUsersComponent } from './management-dashboard-users.component';

describe('ManagementDashboardUsersComponent', () => {
  let component: ManagementDashboardUsersComponent;
  let fixture: ComponentFixture<ManagementDashboardUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDashboardUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDashboardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
