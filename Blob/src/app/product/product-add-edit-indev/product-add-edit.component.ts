import { Component, OnInit } from '@angular/core';
import { IPropertyItem } from 'src/app/interfaces/IPropertyItem';
import { ILocationItem } from 'src/app/interfaces/ILocationItem';
import { IProductItem } from 'src/app/interfaces/IProductItem';


@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.less'],
})
export class ProductAddEditComponent implements OnInit {
  /*******************************************
   ** Variablen                              **
   *******************************************/
  editIdProperty: string | null = null;
  editIdLocation: string | null = null;
  listOfProperty: IPropertyItem[] = [];
  listOfLocation: ILocationItem[] = [];
  listOfCategory = ['Test 1', 'Test 2'];
  indexCategory = 0;

  /*******************************************
   ** Dummmy                                **
   *******************************************/
  id: number;
  productservice: string;
  product: string;
  sku?: string;
  stock: string;
  category: string;
  price: number;

  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor() {}

  ngOnInit(): void {
    
  }

  /*******************************************
   ** Speichern Button                       **
   *******************************************/
  submitForm() {
    console.log("Eigenschaften: ");
    console.log(this.listOfProperty);

    
    console.log("Standorte: ");
    console.log(this.listOfLocation);
  }

  /*******************************************
   ** Katigorie hinzufügen                   **
   *******************************************/
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfCategory.indexOf(value) === -1) {
      this.listOfCategory = [
        ...this.listOfCategory,
        input.value || `New item ${this.indexCategory++}`,
      ];
    }
  }

  /*******************************************
   ** Eigenschaft hinzufügen                 **
   *******************************************/
  addRowProperty(): void {
    this.listOfProperty = [
      ...this.listOfProperty,
      {
        name: '',
        value: '',
      },
    ];
    console.log("Eigenschaften: ");
    console.log(this.listOfProperty);
  }

  /*******************************************
   ** Standort hinzufügen                    **
   *******************************************/
  addRowLocation(): void {
    this.listOfLocation = [
      ...this.listOfLocation,
      {
        locationId: 0,
        productId: this.id,
        quantity: 0,
      },
    ];
    console.log("Standorte: ");
    console.log(this.listOfLocation); 
  }
}
