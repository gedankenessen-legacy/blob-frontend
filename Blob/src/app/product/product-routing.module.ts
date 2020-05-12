import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';


const routes: Routes = [
  {
    path: "",
    component: ProductDashboardComponent
  },
  {
    path: "addedit/:id",
    component: ProductAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
