import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDashboardComponent } from './statistic-dashboard.component';

describe('StatisticDashboardComponent', () => {
  let component: StatisticDashboardComponent;
  let fixture: ComponentFixture<StatisticDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
