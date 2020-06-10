import { Component, OnInit, Input } from '@angular/core';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { ITopSellerItem } from 'src/app/interfaces/statistic/ITopSellerItem';

@Component({
  selector: 'app-statistic-top-product',
  templateUrl: './statistic-top-product.component.html',
  styleUrls: ['./statistic-top-product.component.less'],
})
export class StatisticTopProductComponent implements OnInit {
  @Input()
  set orders(val: any) {
    if (val != null) this.calcWeeklyTopProducts(val);
  }

  topProducts: ITopSellerItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  calcWeeklyTopProducts(listOfOrders: IOrderItem[]) {
    let dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7);
    dateLastWeek.setHours(0, 0, 0, 0);

    let listOfOrdersThisWeek = listOfOrders.filter((order) => new Date(Date.parse(order.createdAt)) > dateLastWeek);

    //console.log(listOfOrdersThisWeek);

    this.topProducts = [];

    listOfOrdersThisWeek.forEach((order) => {
      order.orderedProducts.forEach((product) => {
        if (this.topProducts.filter((tp) => tp.product == product.name).length > 0) {
          this.topProducts.forEach((tp) => {
            if (tp.product == product.name) {
              tp.count += product.quantity;
              tp.profit += product.price * product.quantity;
            }
          });
        } else {
          this.topProducts.push({ product: product.name, count: product.quantity, profit: product.quantity * product.price });
        }
      });
    });
  }
}
