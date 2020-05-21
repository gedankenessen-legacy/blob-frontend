import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';


@NgModule({
  declarations: [OrderDashboardComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
