import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { NzTableModule, NzButtonModule, NzDropDownModule, NzIconModule, NzFormModule, NzInputModule, NzSelectModule, NzDividerModule, NzRadioModule} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
 
@NgModule({
  declarations: [ProductDashboardComponent, ProductAddEditComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDividerModule,
    NzRadioModule
  ]
})
export class ProductModule { }
