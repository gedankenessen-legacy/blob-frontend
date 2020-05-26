import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../order.service';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { NzTableCellDirective } from 'ng-zorro-antd';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { EOrderState } from 'src/app/enums/order/eorder-state.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.less']
})
export class OrderAddEditComponent implements OnInit {

  addForm: FormGroup;
  customers: ICustomerItem[];
  displayProducts: [];
  isLoading: boolean = true;
  currentInvoiceMount: number = 0;
  orderId: number;
  currentOrder: IOrderItem = null;

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService, private orderService: OrderService) { 
    this.titleService.Title = 'Bestellung hinzufügen';
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      customerId: new FormControl(null, Validators.required),
      street: new FormControl({value: null, disabled:true}),
      city: new FormControl({value: null, disabled:true}),
      products: this.fb.array([this.createItem()], Validators.required)
    })
    
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('id'));
    });
    

    this.getAllCustomer();
    this.calcInvoiceMount();
  }

  get formControls() { return this.addForm.controls; }
  get products() { return this.formControls.products as FormArray; }

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

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(
      (data) => {
        console.log(data);
        this.currentOrder = data;
        this.addForm.controls["customerId"].setValue(this.currentOrder.customer.id)
        this.isLoading = false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submitAddForm(): void{

  }

  createItem(): FormGroup {
    return this.fb.group({
      product: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      price: new FormControl({value: 0, disabled:true}),
    });
  }

  public addProduct() {
    var test: FormArray = this.formControls.products as FormArray;
    
    this.products.push(this.createItem());
    this.calcInvoiceMount();
  }

  public removeProduct(index: number) {
    this.products.removeAt(index);
    this.calcInvoiceMount();
  }

  calcInvoiceMount(): void{
    var mount: number = 0;
    for (let product of this.products.controls) {
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
}
