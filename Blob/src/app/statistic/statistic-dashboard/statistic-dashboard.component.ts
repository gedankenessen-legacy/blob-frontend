import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-statistic-dashboard',
  templateUrl: './statistic-dashboard.component.html',
  styleUrls: ['./statistic-dashboard.component.less'],
})
export class StatisticDashboardComponent implements OnInit {
  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private titleService: TitleService) {
    this.titleService.Title = 'Statistik';
    Object.assign(this, { multi: this.multi });
  }

  ngOnInit(): void {}

  onSelect(event) {
    console.log(event);
  }
}
