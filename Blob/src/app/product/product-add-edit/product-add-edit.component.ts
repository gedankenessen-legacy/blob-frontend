import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IPropertyItem } from 'src/app/interfaces/product/IPropertyItem';
import { IProductLocationItem } from 'src/app/interfaces/product/IProductLocationItem';
import { ProductService } from '../product.service';
import { IProductItem } from 'src/app/interfaces/product/IProductItem';
import { ILocationItem } from 'src/app/interfaces/product/ILocationItem';
import { ICategoryItem } from 'src/app/interfaces/product/ICategoryItem';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TitleService } from 'src/app/title.service';

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
  listOfProducts: IProductItem[] = [];
  indexCategory = 0;
  id: number;
  disabledSKU = false;
  product: IProductItem;
  isValide: boolean = true;
  isLoading: boolean = false;
  isCopied: boolean = false;

  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor(
    private fbp: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private modal: NzModalService,
    private titleService: TitleService
  ) {
    this.titleService.Title = 'Produkt Erstellen/Bearbeiten';
  }

  /*******************************************
   ** OnInit                                 *
   *******************************************/
  ngOnInit(): void {
    this.getIDFromProduct();
    this.getAllCategorys();

    this.selectProductService = 'Product';
    this.productForm = this.fbp.group({
      selectProductService: new FormControl('', [Validators.required]),
      productname: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sku: new FormControl(
        { value: '', disable: this.disabledSKU },
        Validators.required
      ),
      category: new FormControl('', [Validators.required]),
    });
    this.productForm.controls['sku'].setValue("");
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
      } else {
        this.getAllLocations();
      }
    } else {
      this.id = Number(splitted[3]);
      this.isCopied = true;
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
        if (data.sku != "NO SKU DEFINED") {
          this.selectProductService = 'Product';
        } else {
          this.selectProductService = 'Service';
          this.productForm.controls['sku'].disable();
        }
        this.productForm.controls['productname'].setValue(data.name);
        this.productForm.controls['price'].setValue(data.price);
        if(data.sku != "NO SKU DEFINED") {
          this.productForm.controls['sku'].setValue(data.sku);
        } else {
          this.productForm.controls['sku'].setValue("Service");
        }

        this.productForm.controls['category'].setValue(data.categories[0].name);

        if(this.isCopied) {
          
          this.listOfProperty = data.properties;
          let props: IPropertyItem[] = [];
          for(let prop of data.properties) {
            let newProperty: IPropertyItem = {
              name: prop.name,
              value: prop.value,
            }
            props.push(newProperty);
          }
          this.listOfProperty = props;
        } else {
          this.listOfProperty = data.properties;
        }

        this.getAllLocations();
        this.createUniqueProduct();
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
        if(this.id != -1) {
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
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*******************************************
   ** Standort hinzufügen                    *
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
        categories: newCategory,
        productsAtLocations: newLocation,
        properties: this.listOfProperty,
      };

      return newProduct;
    } else if (this.selectProductService == 'Service') {
      var newProduct: IProductItem = {
        name: this.productForm.controls['productname'].value,
        price: this.productForm.controls['price'].value,
        categories: newCategory,
        productsAtLocations: newLocation,
        properties: this.listOfProperty,
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
   ** Update Produkt                         *
   *******************************************/
  updateProdukt(id: number, newCategory: ICategoryItem[], newLocation: IProductLocationItem[]) {
    if (this.selectProductService == 'Product') {
      var newProduct: IProductItem = {
        id: id,
        name: this.productForm.controls['productname'].value,
        price: this.productForm.controls['price'].value,
        sku: this.productForm.controls['sku'].value,
        categories: newCategory,
        productsAtLocations: newLocation,
        properties: this.listOfProperty,
      };

      return newProduct;
    } else if (this.selectProductService == 'Service') {
      var newProduct: IProductItem = {
        id: id,
        name: this.productForm.controls['productname'].value,
        price: this.productForm.controls['price'].value,
        categories: newCategory,
        productsAtLocations: newLocation,
        properties: this.listOfProperty,
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

  /*******************************************
   ** Validiere SKU und Name                 *
   *******************************************/
  createUniqueProduct() {
    let i = 1;
    let isNotUnique = true;
    let currentName = this.productForm.controls['productname'].value;
    let currentSKU = this.productForm.controls['sku'].value;
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.listOfProducts = data;
        for(let i = 0; i < this.listOfProducts.length; i++) {
          if(this.productForm.controls['productname'].value == this.listOfProducts[i].name ||
          this.productForm.controls['sku'].value == this.listOfProducts[i].sku) {
            isNotUnique = false;
          }
        }
        while(!isNotUnique) {
          this.productForm.controls['productname'].setValue(currentName + "" + i);
          if(this.productForm.controls['sku'].value != "Service") {
            this.productForm.controls['sku'].setValue(currentSKU + "" + i);
          }
          isNotUnique = true;
          for(let i = 0; i < this.listOfProducts.length; i++) {
            if(this.productForm.controls['productname'].value == this.listOfProducts[i].name ||
            this.productForm.controls['sku'].value == this.listOfProducts[i].sku) {
              isNotUnique = false;
            }
          }
          if(!isNotUnique) {
            i++;
          }
        }
      },
      (error) => {
        console.error(error);
        return false;
      }
    );
  }

  validUniqueProduct() {
    let isValid = true;
    for(let i = 0; i < this.listOfProducts.length; i++) {
      if(this.productForm.controls['productname'].value == this.listOfProducts[i].name ||
      this.productForm.controls['sku'].value == this.listOfProducts[i].sku) {
        isValid = false;
      }
    }
    if(!isValid) {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent: 'Dieses Produkt existiert bereits.',
      });
    }
    return isValid;
  }

  /*******************************************
   ** Validiere Kategorien                   *
   *******************************************/
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

  /*******************************************
   ** Validiere Eigenschaften                *
   *******************************************/
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

  /*******************************************
   ** Validiere Location                     *
   *******************************************/
  validLocation() {
    let isValid = true;
    let size = this.listOfProductLocation.length;
    let locations: IProductLocationItem[] = [];
    let count = 0;
    for (let i = 0; i < size; i++) {
      if(this.listOfProductLocation[i].quantity > 0) {
        locations.push(this.listOfProductLocation[i]);
      } 
      for (let j = 0; j < this.listOfProductLocation.length; j++) {
        if (this.listOfProductLocation[i].locationId == this.listOfProductLocation[j].locationId) {
          count++;
        }
      }
      if (count > 1) {
        isValid = false;
      }
      count = 0;
     }
    this.listOfProductLocation = locations;
    if(this.listOfProductLocation.length < 1) {
      isValid = false;
    }
     if(!isValid) {
      this.modal.error({
        nzTitle: 'Fehler',
        nzContent:
          'Bitte überprüfen Sie Ihre Standorte.',
      });
    } 
     return isValid;
  }

  /*******************************************
   ** Sende Formulare                        *
   *******************************************/
  submitForm() {
    if (this.validProductData() && this.validCategory() && this.validProperties() && this.validLocation() && this.validUniqueProduct()) {
      this.isLoading = true;

      /*******************************************
       ** Erstelle Kategorie                     *
       *******************************************/
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


      /*******************************************
       ** Erstelle Standort                      *
       *******************************************/
      let selectedLocations: IProductLocationItem[] = [];
      for(let i = 0; i < this.listOfProductLocation.length; i++) {
        if((this.listOfProductLocation[i].locationId > 0) &&
        (this.listOfProductLocation[i].quantity > 0)) {
          if(this.id > 0) {
            let newLocation: IProductLocationItem = {
              locationId: this.listOfProductLocation[i].locationId,
              productId: this.id,
              quantity: this.listOfProductLocation[i].quantity,              
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


      /*******************************************
       ** Sende neues Produkt                    *
       *******************************************/
      if (this.id == -1) {
        let newProduct: IProductItem;
        newProduct = this.createNewProdukt(selectedCategory, selectedLocations);  
        this.productService.createProduct(newProduct).subscribe(
          (data) => { 
            this.isLoading = false;
            this.router.navigate(["/product"]);
          },
          (error) => {
            console.error(error);
          }
        );        
      } else {
        /*******************************************
         ** Update Produkt                         *
         *******************************************/
        let updateProduct: IProductItem;
        let updateProductList: IProductItem[] = [];
        updateProductList.push(this.updateProdukt(this.id, selectedCategory, selectedLocations));
        this.productService.updateProduct(updateProductList).subscribe(
          (data) => {
            this.isLoading = false;
            this.router.navigate(["/product"]);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }
}
