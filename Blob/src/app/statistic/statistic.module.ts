import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';

import { NzGridModule, NzModalModule, NzTableModule } from 'ng-zorro-antd';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticWeeklyProfitsComponent } from './statistic-weekly-profits/statistic-weekly-profits.component';
import { StatisticTopProductComponent } from './statistic-top-product/statistic-top-product.component';
import { StatisticTopProductMonthComponent } from './statistic-top-product-month/statistic-top-product-month.component';
import { StatisticMonthlyProfitsComponent } from './statistic-monthly-profits/statistic-monthly-profits.component';

@NgModule({
  declarations: [
    StatisticDashboardComponent,
    StatisticWeeklyProfitsComponent,
    StatisticTopProductComponent,
    StatisticTopProductMonthComponent,
    StatisticMonthlyProfitsComponent,
  ],
  imports: [CommonModule, StatisticRoutingModule, NzGridModule, NgxChartsModule, NzModalModule, NzTableModule],
})
export class StatisticModule {}
