import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';

import {
  NzTableModule,
  NzButtonModule,
  NzDropDownModule,
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzDividerModule,
  NzRadioModule,
  NzModalModule,
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManagementDashboardComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
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
  ],
})
export class ManagementModule {}
