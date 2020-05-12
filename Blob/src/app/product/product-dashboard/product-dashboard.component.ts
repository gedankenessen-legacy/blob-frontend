import { Component, OnInit } from '@angular/core';
import { IProductItem } from '../../interfaces/IProductItem';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.less'],
})
export class ProductDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /********************************************
   ** Variablen                              **
   *******************************************/
  searchValue = '';
  visible = false;

  /********************************************
   ** Liste aller Produkte                   **
   *******************************************/
  listOfData: IProductItem[] = [
    {
      product: 'Product 1',
      sku: 'A123456789',
      stock: 'Freiburg 10, München 5',
      price: 19.99,
    },
    {
      product: 'Product 2',
      sku: 'A123456789',
      stock: 'Freiburg 10, München 5',
      price: 19.99,
    },
    {
      product: 'Product 3',
      sku: 'A123456789',
      stock: 'Freiburg 10, München 5',
      price: 19.99,
    },
  ];

  /********************************************
   ** Produktsuche                           **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: IProductItem) => item.product.indexOf(this.searchValue) !== -1
    );
  }

  /********************************************
  ** Produktsuche zurücksetzten              **
  ********************************************/
  reset() {
    this.searchValue = '';
    this.search();
  }
}
