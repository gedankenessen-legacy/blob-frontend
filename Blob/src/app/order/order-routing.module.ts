import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';
import { PrintComponent } from './print/print.component';


const routes: Routes = [
  {
    path: "",
    component: OrderDashboardComponent
  },
  {
    path: "addedit/:id",
    component: OrderAddEditComponent
  },
  {
    path: "print/:id",
    component: PrintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
