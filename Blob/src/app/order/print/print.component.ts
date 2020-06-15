import { Component, OnInit, Input } from '@angular/core';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { OrderService } from '../order.service';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.less'],
})
export class PrintComponent implements OnInit {
  orderId: number = 0;
  order: IOrderItem;
  customer: ICustomerItem = {
    id: 0,
    firstname: '',
    lastname: '',
    createdAt: '',
    address: {
      id: 0,
      street: '',
      zip: '',
      city: '',
    },
  };

  dataSet = [
    {
      pos: 1,
      name: 'Reifen',
      quantity: 3,
    },
    {
      pos: 2,
      name: 'Reifen',
      quantity: 6,
    },
  ];
  isLoading = false;
  isInvoice = false;
  date = new Date().toLocaleDateString('de-DE');
  tableSize = 'small';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private orderService: OrderService,
    private titleService: TitleService
  ) {
    this.titleService.Title = 'Lieferschein drucken';
  }

  ngOnInit(): void {
    this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.orderId == 0) {
      this.modalService.error({
        nzTitle: 'Fehler',
        nzContent: 'Die Bestellung konnte nicht zugeordnet werden, versuchen Sie es bitte erneut.',
        nzOnOk: () => {
          this.router.navigate(['order']);
        },
      });
    }

    this.loadOrder(this.orderId);
  }

  loadOrder(orderId: number) {
    this.isLoading = true;
    this.orderService.getOrder(orderId).subscribe(
      (data) => {
        this.order = data;
        this.setDataSet();
        this.customer = data.customer;

        this.isLoading = false;
      },
      (error) => {
        this.modalService.error({
          nzTitle: 'Fehler',
          nzContent: 'Die Bestellung konnte nicht geladen werden, versuchen Sie es bitte erneut.',
          nzOnOk: () => this.goBack(),
        });
      }
    );
  }

  setDataSet() {
    this.dataSet = [];
    let id = 1;
    this.order.orderedProducts.forEach((order) => {
      this.dataSet = [...this.dataSet, { pos: id, name: order.name, quantity: order.quantity }];
      id++;
    });
  }

  goBack() {
    this.router.navigate(['order']);
  }
}
