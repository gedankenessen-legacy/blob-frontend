import { Component, OnInit } from '@angular/core';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/title.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.less'],
})
export class CutomerDashboardComponent implements OnInit {
  searchValue: string = '';
  visible: boolean = false;
  isPopupVisible: boolean = false;
  addForm: FormGroup;

  constructor(private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required)
    })

    this.titleService.Title = 'Kunden';

    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        console.log(data);

        this.listOfData = data;
        this.listOfDisplayData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  addNewCustomer(){
    var newCustomerItem: ICustomerItem = {
      id: 4,
      firstName: this.addForm.controls["firstname"].value,
      lastName: this.addForm.controls["lastname"].value,
      address: this.addForm.controls["firstname"].value+", "+this.addForm.controls["zip"].value+" "+this.addForm.controls["city"].value,
      createdAt: "20-05-2020",
    }

    this.customerService.createCustomer(newCustomerItem).subscribe(
      (data) => {
        console.log(data);

        this.listOfData = [
          ...this.listOfData,
          data
        ];
        this.listOfDisplayData = [
          ...this.listOfDisplayData,
          data
        ];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /********************************************
   ** Liste aller Kunden                   **
   *******************************************/
  listOfData: ICustomerItem[] = [
    {
      id: 1,
      firstName: "Test",
      lastName: "Test",
      address: "Badstraße 24, 77654 Offenburg",
      createdAt: "20-05-2020",
    },
    {
      id: 2,
      firstName: "Test 2",
      lastName: "Test 2",
      address: "Badstraße 24, 77654 Offenburg",
      createdAt: "20-05-2020",
    },
  ];

  /********************************************
   ** Kundensuche                            **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ICustomerItem) => item.firstName.indexOf(this.searchValue) !== -1
    );
  }

  /********************************************
   ** Kundensuche zurücksetzten               **
   ********************************************/
  reset() {
    this.searchValue = '';
    this.search();
  }

  /********************************************
   ** Popup aktionen                          **
   ********************************************/
  showPopup(): void {
    this.isPopupVisible = true;
  }

  handlePopupOk(): void {
    this.isPopupVisible = false;
  }

  handlePopupCancel(): void {
    this.isPopupVisible = false;
  }

  submitAddForm(): void{
    console.log("Add clicked");
    this.isPopupVisible = false;
    this.addNewCustomer();
  }
}
