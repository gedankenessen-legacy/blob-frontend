import { Component, OnInit } from '@angular/core';
import { IProductItem } from '../../interfaces/IProductItem';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.less'],
})
export class ProductDashboardComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log(data);

        this.listOfData = data;
        this.listOfDisplayData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /********************************************
   ** Variablen                              **
   *******************************************/
  searchValue = '';
  visible = false;

  /********************************************
   ** Liste aller Produkte                   **
   *******************************************/
  listOfData: Array<IProductItem> = [
    
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
