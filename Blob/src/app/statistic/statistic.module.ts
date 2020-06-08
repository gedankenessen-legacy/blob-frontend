import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';

import { NzGridModule, NzModalModule } from 'ng-zorro-antd';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [StatisticDashboardComponent],
  imports: [CommonModule, StatisticRoutingModule, NzGridModule, NgxChartsModule, NzModalModule],
})
export class StatisticModule {}
