import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
