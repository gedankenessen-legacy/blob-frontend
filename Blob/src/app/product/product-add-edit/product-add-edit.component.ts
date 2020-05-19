import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IPropertyItem } from 'src/app/interfaces/IPropertyItem';
import { ILocationItem } from 'src/app/interfaces/ILocationItem';

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
  listOfCategory = ['Test 1', 'Test 2'];
  indexCategory = 0;
  /*******************************************
   ** Formular Builder                       **
   *******************************************/
  constructor(private fbp: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fbp.group({
      productname: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  /*******************************************
   ** Speichern Button                       **
   *******************************************/
  submitForm() {
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
