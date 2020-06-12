import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticTopProductComponent } from './statistic-top-product.component';

describe('StatisticTopProductComponent', () => {
  let component: StatisticTopProductComponent;
  let fixture: ComponentFixture<StatisticTopProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticTopProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTopProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
