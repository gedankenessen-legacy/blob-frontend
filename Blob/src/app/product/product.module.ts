import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { NzTableModule, NzButtonModule, NzDropDownModule, NzIconModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [ProductDashboardComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule
  ]
})
export class ProductModule { }
