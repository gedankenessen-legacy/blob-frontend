import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutomerDashboardComponent } from './cutomer-dashboard/cutomer-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: CutomerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
