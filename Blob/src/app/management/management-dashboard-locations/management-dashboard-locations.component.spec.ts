import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDashboardLocationsComponent } from './management-dashboard-locations.component';

describe('ManagementDashboardLocationsComponent', () => {
  let component: ManagementDashboardLocationsComponent;
  let fixture: ComponentFixture<ManagementDashboardLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDashboardLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDashboardLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
