import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-statistic-dashboard',
  templateUrl: './statistic-dashboard.component.html',
  styleUrls: ['./statistic-dashboard.component.less'],
})
export class StatisticDashboardComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.Title = 'Statistik';
  }

  ngOnInit(): void {}
}
