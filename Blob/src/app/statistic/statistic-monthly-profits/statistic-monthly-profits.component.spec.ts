import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticMonthlyProfitsComponent } from './statistic-monthly-profits.component';

describe('StatisticMonthlyProfitsComponent', () => {
  let component: StatisticMonthlyProfitsComponent;
  let fixture: ComponentFixture<StatisticMonthlyProfitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticMonthlyProfitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticMonthlyProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
