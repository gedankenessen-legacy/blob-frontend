import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { ILineAreaChartItems } from 'src/app/interfaces/statistic/ILineAreaChartItems';
import { StatisticService } from '../statistic.service';
import { NzModalService } from 'ng-zorro-antd';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';

@Component({
  selector: 'app-statistic-dashboard',
  templateUrl: './statistic-dashboard.component.html',
  styleUrls: ['./statistic-dashboard.component.less'],
})
export class StatisticDashboardComponent implements OnInit {
  multi: ILineAreaChartItems;
  weeklyProfits: ILineAreaChartItems[];

  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Wochentag';
  yAxisLabel: string = 'Umsatz [€]';
  timeline: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private titleService: TitleService, private statisticService: StatisticService, private modalService: NzModalService) {
    this.titleService.Title = 'Statistik';
  }

  ngOnInit(): void {
    this.loadAllOrdersFromBackend();
  }

  private loadAllOrdersFromBackend(): void {
    this.statisticService.getAllOrders().subscribe(
      (data) => {
        console.log(data);
        this.calcWeeklyProfits(data);
      },
      (error) => {
        console.error(error);
        this.modalService.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim laden der Bestellungen ist es zu einem Fehler gekommen, bitte benachrichtigen Sie den Administrator.',
        });
      }
    );
  }

  private calcWeeklyProfits(listOfOrders: IOrderItem[]): void {
    let dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7);
    dateLastWeek.setHours(0, 0, 0, 0);

    let listOfOrdersThisWeek = listOfOrders.filter((order) => new Date(Date.parse(order.createdAt)) > dateLastWeek);

    console.log(listOfOrdersThisWeek);

    // init profits
    this.weeklyProfits = [{ name: 'Wochenumsatz', series: [] }];
    // foreach order add to weeklyProfits
    listOfOrdersThisWeek.forEach((order) => {
      let weekday = new Date(Date.parse(order.createdAt)).toLocaleString('de-DE', { weekday: 'long' });
      let profit = order.orderedProducts.reduce((sum, order) => (sum += order.price * order.quantity), 0);

      console.log(this.weeklyProfits[0].series.filter((series) => series.name == weekday));

      // If already a series with the same weekday (eg. monday) only update value, in order to avoid duplicate series with same name.
      if (this.weeklyProfits[0].series.filter((series) => series.name == weekday).length > 0) {
        this.weeklyProfits[0].series.forEach((series) => {
          if (series.name == weekday) {
            series.value += profit;
          }
        });
      }
      // Series not created so far.
      else {
        this.weeklyProfits[0].series.push({
          name: weekday,
          value: profit,
        });
      }
    });

    console.log(this.weeklyProfits);
  }

  onSelect(event) {
    console.log(event);
  }
}
