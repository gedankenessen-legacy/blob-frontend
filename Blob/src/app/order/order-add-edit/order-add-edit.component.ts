import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.less']
})
export class OrderAddEditComponent implements OnInit {

  addForm: FormGroup;

  constructor(private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      customer: new FormControl(null, Validators.required),
      products: this.fb.array([
        this.fb.control('')
      ])
    })

    this.titleService.Title = 'Kunden hinzufügen';
  }

  submitAddForm():void{

  }

}
