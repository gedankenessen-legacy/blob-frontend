import { Component, OnInit } from '@angular/core';

import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.less'],
})
export class ManagementDashboardComponent implements OnInit {

  constructor(private titleService: TitleService) {
    this.titleService.Title = 'Verwaltung';
  }

  ngOnInit(): void {
   
  }

 }