import { Component, OnInit } from '@angular/core';
import { IProductItem } from '../../interfaces/IProductItem';
import { ProductService } from '../product.service';
import { NzModalService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { IProductLocationItem } from 'src/app/interfaces/IProductLocationItem';
import { ILocationItem } from 'src/app/interfaces/ILocationItem';
import { IProductDashboardItem } from 'src/app/interfaces/IProductDashboardItem';

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
  listOfData: Array<IProductDashboardItem> = [];
  listOfLocation: ILocationItem[] = [];

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
        this.listOfData.forEach(element => {
          if(element.sku == "NO SKU DEFINED") {
            element.sku = "Service";
          }
        });
        this.getAllLocations();
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


  getAllLocations() {
    this.productService.getAllLocations().subscribe(
      (data) => {
        this.listOfLocation = data;        
        for(let product of this.listOfData) {
          let locs = "";
          product.productsAtLocations.forEach(loc => {
            let locId = loc.locationId;

            let name = this.listOfLocation.filter(x => x.id == locId)[0].name;
            let quantity = loc.quantity;

            locs = locs + name + " - " + quantity + " Stück, ";
          })
          product.locationString = locs;
        }
      },
      (error) => {
        console.error(error);
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
