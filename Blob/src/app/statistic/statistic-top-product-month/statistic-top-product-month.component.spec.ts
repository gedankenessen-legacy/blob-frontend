import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticTopProductMonthComponent } from './statistic-top-product-month.component';

describe('StatisticTopProductMonthComponent', () => {
  let component: StatisticTopProductMonthComponent;
  let fixture: ComponentFixture<StatisticTopProductMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticTopProductMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTopProductMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
