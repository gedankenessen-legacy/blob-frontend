import { Component, OnInit } from '@angular/core';
import { IProductItem } from '../../interfaces/IProductItem';
import { ProductService } from '../product.service';
import { NzModalService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService, private modal:NzModalService, private router: Router) {}

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

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Produkte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }


  getLocation(id: number) {
    this.isLoading = true;
    this.productService.getLocations(id).subscribe(
      (data) => {
        this.isLoading = false;
        return of(data.name);
      },
      (error) => {
        this.isLoading = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Produkte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
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
    this.router.navigateByUrl("/product/addedit/"+id);
  }

  deleteButtonClicked(id: number) {
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
    this.router.navigateByUrl("/product/addedit/"+id+"/copy");
  }
}
