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
import { NzModalService } from 'ng-zorro-antd';

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
  disabledSKU = false;
  product: IProductItem;
  isValide: boolean = true;

  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor(
    private fbp: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getIDFromProduct();
    this.getAllCategorys();

    this.selectProductService = 'Product';
    this.productForm = this.fbp.group({
      selectProductService: new FormControl('', [Validators.required]),
      productname: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sku: new FormControl(
        { value: ' ', disable: this.disabledSKU },
        Validators.required
      ),
      category: new FormControl('', [Validators.required]),
    });

    console.log('ID:' + this.id);
  }

  /*******************************************
   ** ID von Produkt                         **
   *******************************************/
  getIDFromProduct() {
    var str = this.router.url;
    var splitted = str.split('/');
    if (splitted[4] != 'copy') {
      this.id = Number(splitted[3]);
      if (this.id != -1) {
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
        this.product = data;
        console.log(data);
        if (data.sku != null) {
          this.selectProductService = 'Product';
        } else {
          this.selectProductService = 'Service';
        }
        this.productForm.controls['productname'].setValue(data.name);
        this.productForm.controls['price'].setValue(data.price);
        this.productForm.controls['sku'].setValue(data.sku);

        this.productForm.controls['category'].setValue(data.categories[0].name);

        this.listOfProperty = data.properties;

        this.getAllLocations();
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
        this.listOfCategory = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Kategorie hinzufügen                   **
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
      if(value.length > 0) {
        this.listOfCategory = [
          ...this.listOfCategory,
          {
            name: input.value || `Kategorie ${this.indexCategory++}`,
          },
        ];
      }
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
   ** Produkt/Service wechsel               **
   *******************************************/
  clickService() {
    this.disabledSKU = true;
    this.productForm.controls['sku'].disable();
  }

  clickProduct() {
    this.disabledSKU = false;
    this.productForm.controls['sku'].enable();
  }

  /*******************************************
   ** Lade alle Locations von Datenbank     **
   *******************************************/
  getAllLocations() {
    this.productService.getAllLocations().subscribe(
      (data) => {
        this.listOfLocation = data;
        this.listOfProductLocation = [];

        this.product.productsAtLocations.forEach((loc) => {
          let locId = loc.locationId;

          let name = this.listOfLocation.filter((x) => x.id == locId)[0].name;
          let quantity = loc.quantity;

          this.listOfProductLocation.push({
            locationId: locId,
            name: name,
            quantity: quantity,
          });
        });

        console.log(this.listOfLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Standort hinzufügen                    **
   *******************************************/
  addRowLocation(): void {
    if (this.listOfProductLocation.length < this.listOfLocation.length) {
      this.listOfProductLocation = [
        ...this.listOfProductLocation,
        {
          locationId: 0,
          quantity: 0,
        },
      ];
    }
  }

  onLocationChange(locationID: number) {
    let count = 0;
    for (let i = 0; i < this.listOfProductLocation.length; i++) {
      if (this.listOfProductLocation[i].locationId == locationID) {
        count++;
      }
    }
    if (count > 1) {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent: 'Der ausgewählte Standort wird bereits benutzt.',
      });
    }
  }

  /*******************************************
   ** Erstelle Produkt                      **
   *******************************************/
  createNewProdukt(newCategory: ICategoryItem[], newLocation: IProductLocationItem[]) {
    if (this.selectProductService == 'Product') {
      var newProduct: IProductItem = {
        name: this.productForm.controls['productname'].value,
        price: this.productForm.controls['price'].value,
        sku: this.productForm.controls['sku'].value,
        category: newCategory,
        productsAtLocations: newLocation,
        property: this.listOfProperty,
      };

      return newProduct;
    } else if (this.selectProductService == 'Service') {
      var newProduct: IProductItem = {
        name: this.productForm.controls['productname'].value,
        price: this.productForm.controls['price'].value,
        category: newCategory,
        productsAtLocations: newLocation,
        property: this.listOfProperty,
      };

      return newProduct;
    } else {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent:
          'Beim Erstellen der Produkte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
      });
      return null;
    }
  }

  /*******************************************
   ** Speichern Button                       **
   *******************************************/
  validProductData() {
    if(this.selectProductService == "Product") {
      if((this.productForm.controls['productname'].value.length > 0) &&
      (this.productForm.controls['price'].value > 0) &&
      (this.productForm.controls['sku'].value.length > 0)) {
        return true;
      } else {
        this.modal.error({
          nzTitle: 'Fehler',
          nzContent:
            'Bitte geben Sie alle Produktdaten an.',
        });
        return false;
      }
    } else if(this.selectProductService == "Service") {
      if((this.productForm.controls['productname'].value.length > 0) &&
      (this.productForm.controls['price'].value > 0)) {
        return true;
      } else {
        this.modal.error({
          nzTitle: 'Fehler',
          nzContent:
            'Bitte geben Sie alle Produktdaten an.',
        });
        return false;
      }   
    } else {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent:
          'Beim Erstellen der Produkte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
      });
      return false;
    }
  }

  validCategory() {
    if (this.productForm.controls['category'].value.length > 0) {
      return true;
    } else {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent: 'Bitte wählen Sie eine Kategorie aus.',
      });
      return false;
    }
  }

  validProperties() {
    let isValid = true;
    for (let i = 0; i < this.listOfProperty.length; i++) {
        if (this.listOfProperty[i].name.length <= 0 && this.listOfProperty[i].value.length <= 0) {
          this.listOfProperty = this.listOfProperty.filter(x => x != this.listOfProperty[i]);
        } else if(this.listOfProperty[i].name.length <= 0 || this.listOfProperty[i].value.length <= 0) {
          this.modal.error({
            nzTitle: 'Fehler',
            nzContent:
              'Bitte überprüfen Sie Ihre Eigenschaften.',
          });
          isValid = false;
        } else {
          isValid = true;
        }
     }
     return isValid;
  }

  validLocation() {
    let isValid = true;
    for (let i = 0; i < this.listOfProductLocation.length; i++) {
        if (this.listOfProductLocation[i].name.length <= 0 && this.listOfProductLocation[i].quantity <= 0) {
          isValid = false;
        }
     }
     return isValid;
  }


  submitForm() {
    if (this.validProductData() && this.validCategory() && this.validProperties()) {

      //Produkt Kategorie
      let selectedCategory: ICategoryItem[] = [];
      let categoryName = this.productForm.controls['category'].value;
      for (let i = 0; i < this.listOfCategory.length; i++) {
        if (this.listOfCategory[i].name == categoryName) {
          if (this.listOfCategory[i].id != null) {
            let newCategory: ICategoryItem = {
              id: this.listOfCategory[i].id,
              name: this.listOfCategory[i].name,
            };
            selectedCategory.push(newCategory);
          } else {
            let newCategory: ICategoryItem = {
              name: categoryName,
            };
            selectedCategory.push(newCategory);
          }
        }
      }


      //Produkt Location
      let selectedLocations: IProductLocationItem[] = [];
      for(let i = 0; i < this.listOfProductLocation.length; i++) {
        if((this.listOfProductLocation[i].locationId > 0) &&
        (this.listOfProductLocation[i].quantity > 0)) {
          if(this.id > 0) {
            let newLocation: IProductLocationItem = {
              locationId: this.listOfProductLocation[i].locationId,
              quantity: this.listOfProductLocation[i].quantity,
              productId: this.id,
            }
            selectedLocations.push(newLocation);
          } else {
            let newLocation: IProductLocationItem = {
              locationId: this.listOfProductLocation[i].locationId,
              quantity: this.listOfProductLocation[i].quantity,
            }
            selectedLocations.push(newLocation);
          }
        }
      }


      if (this.id == -1) {
        let newProduct: IProductItem;
        newProduct = this.createNewProdukt(selectedCategory, selectedLocations);  
        this.productService.createProduct(newProduct).subscribe(
          (data) => {
            console.log(data);
           this.router.navigateByUrl["/product"];
          },
          (error) => {
            console.error(error);
          }
        );
        
      } else {
      }
    }
  }
}
