import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';


const routes: Routes = [
  {
    path: "",
    component: OrderDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
