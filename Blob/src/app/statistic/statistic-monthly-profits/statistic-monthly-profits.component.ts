import { Component, OnInit, Input } from '@angular/core';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';

@Component({
  selector: 'app-statistic-monthly-profits',
  templateUrl: './statistic-monthly-profits.component.html',
  styleUrls: ['./statistic-monthly-profits.component.less'],
})
export class StatisticMonthlyProfitsComponent implements OnInit {
  @Input()
  set orders(val: any) {
    if (val != null) this.calcWeeklyProfits(val);
  }

  // TODO: make responsive...
  view: any[] = [700, 350];

  // options
  legend: boolean = false;
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
    domain: ['#29b6f6', '#E44D25'],
  };

  weeklyProfits: { name: string; series: any[] }[];

  constructor() {}

  ngOnInit(): void {}

  calcWeeklyProfits(listOfOrders: IOrderItem[]): void {
    let dateLastWeek = new Date();
    dateLastWeek.setDate(1);
    dateLastWeek.setHours(0, 0, 0, 0);

    let listOfOrdersThisWeek = listOfOrders.filter((order) => new Date(Date.parse(order.createdAt)) > dateLastWeek);

    //console.log(listOfOrdersThisWeek);

    // init profits
    this.weeklyProfits = [{ name: 'Umsatz', series: [] }];
    // foreach order add to weeklyProfits
    listOfOrdersThisWeek.forEach((order) => {
      let weekday = new Date(Date.parse(order.createdAt)).getDate(); //+ ` (${new Date(Date.parse(order.createdAt)).toLocaleDateString('de-DE')})`;
      let profit = order.orderedProducts.reduce((sum, order) => (sum += order.price * order.quantity), 0);

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
    console.log(this.weeklyProfits[0].series);
  }
}
