import { Component, OnInit, Input } from '@angular/core';
import { ITopSellerItem } from 'src/app/interfaces/statistic/ITopSellerItem';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';

@Component({
  selector: 'app-statistic-top-product-month',
  templateUrl: './statistic-top-product-month.component.html',
  styleUrls: ['./statistic-top-product-month.component.less'],
})
export class StatisticTopProductMonthComponent implements OnInit {
  @Input()
  set orders(val: any) {
    if (val != null) this.calcMonthlyTopProducts(val);
  }

  topProducts: ITopSellerItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  calcMonthlyTopProducts(listOfOrders: IOrderItem[]) {
    let dateLastWeek = new Date();
    dateLastWeek.setDate(1);
    dateLastWeek.setHours(0, 0, 0, 0);

    let listOfOrdersThisWeek = listOfOrders.filter((order) => new Date(Date.parse(order.createdAt)) > dateLastWeek);

    console.log(listOfOrdersThisWeek);

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
