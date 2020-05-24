import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { NzTableModule, NzButtonModule, NzDropDownModule, NzIconModule, NzFormModule, NzInputModule, NzSelectModule, NzDividerModule, NzRadioModule, NzModalModule, NzTabsModule} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderAddEditComponent } from './order-add-edit/order-add-edit.component';


@NgModule({
  declarations: [OrderDashboardComponent, OrderAddEditComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
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
    NzRadioModule,
    NzModalModule,
    NzTabsModule
  ]
})
export class OrderModule { }
