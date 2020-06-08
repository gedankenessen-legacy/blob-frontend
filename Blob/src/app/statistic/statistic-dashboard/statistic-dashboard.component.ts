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
  orders: any;

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
        this.orders = data;
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
}
