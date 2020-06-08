import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';

import { NzGridModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [StatisticDashboardComponent],
  imports: [CommonModule, StatisticRoutingModule, NzGridModule],
})
export class StatisticModule {}
