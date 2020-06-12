import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticWeeklyProfitsComponent } from './statistic-weekly-profits.component';

describe('StatisticWeeklyProfitsComponent', () => {
  let component: StatisticWeeklyProfitsComponent;
  let fixture: ComponentFixture<StatisticWeeklyProfitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticWeeklyProfitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticWeeklyProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
