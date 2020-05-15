import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CutomerDashboardComponent } from './cutomer-dashboard/cutomer-dashboard.component';
import { NzTableModule, NzButtonModule, NzDropDownModule, NzIconModule, NzFormModule, NzInputModule, NzSelectModule, NzDividerModule, NzRadioModule, NzModalModule} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CutomerDashboardComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
    NzModalModule
  ]
})
export class CustomerModule { }
