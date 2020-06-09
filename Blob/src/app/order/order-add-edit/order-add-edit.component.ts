import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../order.service';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { NzTableCellDirective, NzModalService } from 'ng-zorro-antd';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { EOrderState } from 'src/app/enums/order/eorder-state.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductItem } from 'src/app/interfaces/product/IProductItem';
import { ProductService } from 'src/app/product/product.service';
import { IOrderProduct } from 'src/app/interfaces/order/IOrderProduct';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.less']
})
export class OrderAddEditComponent implements OnInit {

  addForm: FormGroup;
  customers: ICustomerItem[];
  products: IProductItem[];
  displayProducts: [];
  isLoading: boolean = true;
  currentInvoiceMount: number = 0;
  orderId: number;
  currentOrder: IOrderItem = null;

  constructor(private modal:NzModalService,private router: Router,private route: ActivatedRoute, private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService, private orderService: OrderService, private productService: ProductService) { 
    this.titleService.Title = 'Bestellung hinzufügen';
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      customerId: new FormControl(null, Validators.required),
      street: new FormControl({value: null, disabled:true}),
      city: new FormControl({value: null, disabled:true}),
      products: this.fb.array([], Validators.required)
    })
    
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('id'));
    });
    

    this.getAllCustomer();
    this.getAllProducts();
    this.calcInvoiceMount();
  }

  get formControls() { return this.addForm.controls; }
  get orderProducts() { return this.formControls.products as FormArray; }

  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        console.log(data);
        this.customers = data;

        if(this.orderId>0){
          this.getOrder();
        }else{
          this.isLoading = false
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(
      (data) => {
        console.log(data);
        this.currentOrder = data;
        if(this.currentOrder.customer){
          this.addForm.controls["customerId"].setValue(this.currentOrder.customer.id)
        }

        if(data.orderedProducts!=null){
          for(let orderProduct of data.orderedProducts){
            this.orderProducts.push(this.createItem(orderProduct.id,orderProduct.quantity, orderProduct.price, true));
          }
        }
        this.calcInvoiceMount();
        this.isLoading = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submitAddForm(): void{
   this.isLoading = true;
    
    var products: IOrderProduct[] = [];
    for (let product of this.orderProducts.controls) {
      var currentQuantity: number = product["controls"]["quantity"].value;
      //var currentPrice: number = Number(product["controls"]["price"].value);

      var currentProduct: IProductItem[] = this.products.filter(
        (item: IProductItem) => item.id == product["controls"]["product"].value
      );
      
      
      products = [
        ...products,
        {
          id: currentProduct[0].id,
          name: null,
          price: 0,
          sku: null,
          quantity: currentQuantity,
        }
      ];
    }

    var currentCustomer: ICustomerItem = this.customers.filter(
      (item: ICustomerItem) => item.id == this.addForm.controls["customerId"].value
    )[0];

    var newOrderItem: IOrderItem = {
      id: this.orderId,
      createdAt: null,
      customer: {
        id: this.addForm.controls["customerId"].value,
        firstname: null,
        lastname: null,
        address: {
          id: currentCustomer.address.id,
          street: null,
          zip: null,
          city: null,
        },
        createdAt: null,
      },
      orderedProducts:products,
      state: {
        id: EOrderState.notPaid,
        value: "Nicht Bezahlt",
      }
    }

    if(this.orderId>0){
      console.log(newOrderItem);

      this.orderService.updateOrders([newOrderItem]).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/order']);
        },
        (error) => {
          this.isLoading = false;

          this.modal.error({
            nzTitle: 'Fehler beim Bearbeiten',
            nzContent: 'Beim Bearbeiten der Bestellung ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
          });
        }
      );
    }else{
      this.orderService.createOrder(newOrderItem).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/order']);
        },
        (error) => {
          this.isLoading = false;

          this.modal.error({
            nzTitle: 'Fehler beim Anlegen',
            nzContent: 'Beim Anlegen der Bestellung ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
          });
        }
      );
    }
  }

  createItem(product: number = null, quantity: number = 1, price: number = 0, wasInOrder: boolean = false): FormGroup {
    return this.fb.group({
      product: new FormControl(product, [Validators.required]),
      quantity: new FormControl(quantity, [Validators.required]),
      price: new FormControl({value: price, disabled:true}),
      wasInOrder: new FormControl(wasInOrder)
    });
  }

  addProduct(e: MouseEvent) {
    e.preventDefault();
    var test: FormArray = this.formControls.products as FormArray;
    
    this.orderProducts.push(this.createItem());
    this.calcInvoiceMount();
  }

  removeProduct(index: number) {
    this.orderProducts.removeAt(index);
    this.calcInvoiceMount();
  }

  calcInvoiceMount(): void{
    var mount: number = 0;
    for (let product of this.orderProducts.controls) {
      var currentQuantity: number = product["controls"]["quantity"].value;
      var currentPrice: number = Number(product["controls"]["price"].value);
      mount += currentQuantity*currentPrice;
    }
    this.currentInvoiceMount = mount;
  }

  customerChanged(): void{
    var customer: ICustomerItem[] = this.customers.filter(
      (item: ICustomerItem) => item.id == this.addForm.controls["customerId"].value
    );

    //TODO Wenn kein Kunde gefunden wird
    this.addForm.controls["street"].setValue(customer[0].address.street);
    this.addForm.controls["city"].setValue(customer[0].address.zip+", "+customer[0].address.city);
  }

  productChanged(index: number): void{
    
    var product: IProductItem[] = this.products.filter(
      (item: IProductItem) => item.id == this.orderProducts.controls[index]["controls"]["product"].value
    );

    //TODO Wenn kein Kunde gefunden wird
    this.orderProducts.controls[index]["controls"]["price"].setValue(product[0].price);
    this.calcInvoiceMount();
  }
}
