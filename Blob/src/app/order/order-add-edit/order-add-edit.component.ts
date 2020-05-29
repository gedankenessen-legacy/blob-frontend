import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../order.service';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { NzTableCellDirective } from 'ng-zorro-antd';
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

  constructor(public router: Router,private route: ActivatedRoute, private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService, private orderService: OrderService, private productService: ProductService) { 
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

        if(this.orderId>=0){
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
        this.addForm.controls["customerId"].setValue(this.currentOrder.customer.id)

        if(data.orderProducts!=null){
          for(let orderProduct of data.orderProducts){
            this.orderProducts.push(this.createItem(orderProduct.id,orderProduct.quantity, orderProduct.price));
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
      var currentPrice: number = Number(product["controls"]["price"].value);

      var currentProduct: IProductItem[] = this.products.filter(
        (item: IProductItem) => item.id == product["controls"]["product"].value
      );
      
      
      products = [
        ...products,
        {
          id: currentProduct[0].id,
          name: currentProduct[0].product,
          price: currentPrice,
          sku: currentProduct[0].sku,
          quantity: currentQuantity,
        }
      ];
    }

    var currentCustomer: ICustomerItem[] = this.customers.filter(
      (item: ICustomerItem) => item.id == this.addForm.controls["customerId"].value
    );

    var newOrderItem: IOrderItem = {
      id: this.orderId,
      locationId: 1,
      customer: currentCustomer[0],
      createdAt: "27-05-2020",
      orderProducts:products,
      state: {
        id: EOrderState.notPaid,
        value: "Nicht Bezahlt",
      }
    }

    if(this.orderId>=0){
      this.orderService.updateOrders([newOrderItem]).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/order']);
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.orderService.createOrder(newOrderItem).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/order']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  createItem(product: number = null, quantity: number = 1, price: number = 0): FormGroup {
    return this.fb.group({
      product: new FormControl(product, [Validators.required]),
      quantity: new FormControl(quantity, [Validators.required]),
      price: new FormControl({value: price, disabled:true}),
    });
  }

  public addProduct(e: MouseEvent) {
    e.preventDefault();
    var test: FormArray = this.formControls.products as FormArray;
    
    this.orderProducts.push(this.createItem());
    this.calcInvoiceMount();
  }

  public removeProduct(index: number) {
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
