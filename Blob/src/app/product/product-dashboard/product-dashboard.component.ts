import { Component, OnInit } from '@angular/core';
import { IProductItem } from '../../interfaces/IProductItem';
import { ProductService } from '../product.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.less'],
})
export class ProductDashboardComponent implements OnInit {
  
  /********************************************
   ** Variablen                              **
   *******************************************/
  searchValue = '';
  visible = false;
  isLoading: boolean = true;
  listOfData: Array<IProductItem> = [ ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.listOfData = data;
        this.listOfDisplayData = data;

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;

        /* TODO: Nach Import läd Seite nicht mehr */ 
        /* this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Produkte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        }); */
      }
    );
  }

  /********************************************
   ** Produktsuche                           **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: IProductItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  /********************************************
   ** Produktsuche zurücksetzten              **
   ********************************************/
  reset() {
    this.searchValue = '';
    this.search();
  }

  /********************************************
   ** Quickaction Buttons                    **
   ********************************************/
  editButtonClicked(id: number) {
    console.log('copy clicked');

    this.isLoading = true;

    var products: IProductItem[] = this.listOfData.filter((item: IProductItem) => item.id == id);

    var product:IProductItem = products[0];
    
    /* TODO: Wohin kommen die Daten? Seitenwechsel */
    /* Senden an product/addedit/id */
  }

  deleteButtonClicked(id: number) {
    console.log('delete clicked');

    this.isLoading = true;

    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.getAllProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  copyButtonClicked(id: number) {
    console.log('copy clicked');

    this.isLoading = true;

    var products: IProductItem[] = this.listOfData.filter((item: IProductItem) => item.id == id);

    var product:IProductItem = products[0];

    /* TODO: Wohin kommen die Daten? Seitenwechsel */
    /* Senden an product/addedit/-1 */
  }
}
