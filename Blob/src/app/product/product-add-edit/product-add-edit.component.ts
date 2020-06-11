import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IPropertyItem } from 'src/app/interfaces/IPropertyItem';
import { IProductLocationItem } from 'src/app/interfaces/IProductLocationItem';
import { ProductService } from '../product.service';
import { IProductItem } from 'src/app/interfaces/IProductItem';
import { ILocationItem } from 'src/app/interfaces/ILocationItem';
import { ICategoryItem } from 'src/app/interfaces/ICategoryItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.less'],
})
export class ProductAddEditComponent implements OnInit {
  /*******************************************
   ** Variablen                              **
   *******************************************/
  selectProductService: string;
  productForm: FormGroup;
  editIdProperty: string | null = null;
  editIdLocation: string | null = null;
  listOfProperty: IPropertyItem[] = [];
  listOfLocation: ILocationItem[] = [];
  listOfProductLocation: IProductLocationItem[] = [];
  listOfCategory: ICategoryItem[] = [];
  indexCategory = 0;
  id: number;

  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor(
    private fbp: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIDFromProduct();
    this.getAllCategorys();
    this.productForm = this.fbp.group({
      selectProductService: new FormControl(0, [Validators.required]),
      productname: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });

    console.log("ID:" + this.id);
    //this.getAllLocations();
    //this.getPropertysFromProduct();
  }

  /*******************************************
   ** ID von Produkt                         **
   *******************************************/
  getIDFromProduct() {
    var str = this.router.url; 
    var splitted = str.split("/"); 
    if(splitted[4] != "copy") {
      this.id = Number(splitted[3]);
      if(this.id != -1) {
        this.getProductData();
      }
    } else {
      this.id = Number(splitted[3]);
      this.getProductData();
      this.id = -1;
    }
  }

  /*******************************************
   ** Lade Produktdaten                     **
   *******************************************/
  getProductData() {
      this.productService.getProduct(this.id).subscribe(
        (data) => {
          if(data.sku != null) {
            this.selectProductService = "Product";
          } else {
            this.selectProductService = "Service";
          }
          this.productForm.controls['productname'].setValue(data.name);
          this.productForm.controls['price'].setValue(data.price);
          this.productForm.controls['sku'].setValue(data.sku);
          
          this.productForm.controls['category'].setValue(data.categories[0].name);
          
          this.listOfProperty = data.properties;
          this.listOfProductLocation = data.productsAtLocations;
        },
        (error) => {
          console.error(error);
        }
      );
  }



  /*******************************************
   ** Lade alle Locations von Datenbank     **
   *******************************************/
  getAllLocations() {
    this.productService.getAllLocations().subscribe(
      (data) => {
        console.log(data);

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

        this.listOfCategory = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Lade alle Eigenschaten von Datenbank  **
   *******************************************/
  getPropertysFromProduct() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        let propertys: IPropertyItem[] = [];
        for (var dcy = 0; dcy < data.length; dcy++) {
          for (var cy = 0; cy < data[dcy].properties.length; cy++) {
            let propertyData = {
              id: data[dcy].properties[cy].id,
              name: data[dcy].properties[cy].name,
              value: data[dcy].properties[cy].value,
            };
            propertys.push(propertyData);
          }
        }
        console.log(propertys);
        this.listOfProperty = propertys;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Erstelle Produkt                      **
   *******************************************/
  createNewProdukt() {
    var newProduct: IProductItem = {
      id: 0,
      productservice: 'string',
      name: this.productForm.controls['productname'].value,
      sku: this.productForm.controls['sku'].value,
      category: this.listOfCategory,
      location: this.listOfProductLocation,
      property: this.listOfProperty,
      price: this.productForm.controls['price'].value,
    };
  }

  /*******************************************
   ** Speichern Button                       **
   *******************************************/
  submitForm() {
    this.createNewProdukt();
  }

  /*******************************************
   ** Katigorie hinzufügen                   **
   *******************************************/
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    let isInList = 0;
    for (let i = 0; i < this.listOfCategory.length; i++) {
      if (this.listOfCategory[i].name == value) {
        isInList = 1;
      }
    }
    if (isInList == 0) {
      this.listOfCategory = [
        ...this.listOfCategory,
        {
          name: input.value || `New item ${this.indexCategory++}`,
        },
      ];
    }
  }

  /*******************************************
   ** Eigenschaft hinzufügen                 **
   *******************************************/
  addRowProperty(): void {
    let haveEmptyField = 0;
    for (let i = 0; i < this.listOfProperty.length; i++) {
      if (
        this.listOfProperty[i].name == '' ||
        this.listOfProperty[i].value == ''
      ) {
        haveEmptyField = 1;
      }
    }
    if (haveEmptyField == 0) {
      this.listOfProperty = [
        ...this.listOfProperty,
        {
          name: '',
          value: '',
        },
      ];
    }
  }

  /*******************************************
   ** Standort hinzufügen                    **
   *******************************************/
  addRowLocation(): void {
    this.listOfLocation = [
      ...this.listOfLocation,
      {
        id: 0,
        name: '',
      },
    ];
  }
}
