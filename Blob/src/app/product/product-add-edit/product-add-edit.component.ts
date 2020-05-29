import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IPropertyItem } from 'src/app/interfaces/IPropertyItem';
import { ILocationItem } from 'src/app/interfaces/ILocationItem';
import { ProductService } from '../product.service';
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
  selectProductService = 'product';
  productForm: FormGroup;
  editIdProperty: string | null = null;
  editIdLocation: string | null = null;
  listOfProperty: IPropertyItem[] = [];
  listOfLocation: ILocationItem[] = [];
  listOfCategory: string[] = [];
  indexCategory = 0;
  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor(private fbp: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllCategorys();
    this.productForm = this.fbp.group({
      productname: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  /*******************************************
   ** Lade alle Locations von Datenbank     **
   *******************************************/
  getAllLocations() {
    this.productService.getAllLocations().subscribe(
      (data) => {
        console.log(data);

        /* let locations: ILocationItem[] = [];
        for(var loc = 0; loc < data.length; loc++) {

          let locationData = {
            location: data[loc].location,
            amount: data[loc].amount
          }; 

          locations.push(locationData);
        } */

        this.listOfLocation = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Lade alle Kategorien von Datenbank    **
   *******************************************/
  getAllCategorys() {
    this.productService.getAllCategorys().subscribe(
      (data) => {
        console.log(data);

        this.listOfCategory = data.map(category => category.name);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Erstelle Produkt                      **
   *******************************************/
  createProduct(newProduct:IProductItem, newLocation:Array<ILocationItem>, newProperty:Array<IPropertyItem>) {
    //Brauche das angeforderte JSON vom Backend

    /* this.createProduct(newProduct, newLocation, newProperty).subscribe(
      (data) => {

      },
      (error) => {
        console.error(error);
      }
    ) */
  }

  /*******************************************
   ** Speichern Button                       **
   *******************************************/
  submitForm() {
    //Brauche das angeforderte JSON vom Backend

    //this.createProduct(product , this.listOfLocation, this.listOfProperty)
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
  }

  /*******************************************
   ** Standort hinzufügen                    **
   *******************************************/
  addRowLocation(): void {
    this.listOfLocation = [
      ...this.listOfLocation,
      {
        location: '',
        amount: 0,
      },
    ];
  }
}