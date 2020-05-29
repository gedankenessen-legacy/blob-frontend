import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/title.service';
import { CustomerService } from '../customer.service';
import { IAdress } from 'src/app/interfaces/iadress';

@Component({
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.less'],
})
export class CutomerDashboardComponent implements OnInit {
  searchValue: string = '';
  visible: boolean = false;
  isPopupVisible: boolean = false;
  isLoading: boolean = true;
  addForm: FormGroup;

  constructor(private fb:FormBuilder, private titleService:TitleService, private customerService: CustomerService) {
    this.titleService.Title = 'Kunden';
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required)
    })

    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        console.log(data);

        this.listOfData = data;
        this.listOfDisplayData = data;

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  addNewCustomer(id:number = -1){
    var address: IAdress =  {
      id: -1,
      street: this.addForm.controls["street"].value,
      zip: this.addForm.controls["zip"].value,
      city: this.addForm.controls["city"].value
    }
    var newCustomerItem: ICustomerItem = {
      id: 4,
      firstname: this.addForm.controls["firstname"].value,
      lastname: this.addForm.controls["lastname"].value,
      address: address,
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
  listOfData: ICustomerItem[] = [];
  /* listOfData: ICustomerItem[] = [
    {
      id: 1,
      firstname: "Test",
      lastname: "Test",
      address: {
        id: 1,
        street: "Badstraße 24",
        zip: "77654",
        city: "Offenburg"
      },
      createdAt: "20-05-2020",
    },
    {
      id: 2,
      firstname: "Test 2",
      lastname: "Test 2",
      address: {
        id: 1,
        street: "Badstraße 24",
        zip: "77654",
        city: "Offenburg"
      },
      createdAt: "20-05-2020",
    },
  ]; */

  /********************************************
   ** Kundensuche                            **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ICustomerItem) => (item.firstname +" "+item.lastname).indexOf(this.searchValue) !== -1
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

  handlePopupCancel(): void {
    this.isPopupVisible = false;
  }

  submitAddForm(): void{
    console.log("Add clicked");
    this.isPopupVisible = false;
    this.addNewCustomer();
  }

  editButtonClicked(): void{
    console.log("Edit clicked");
    this.isPopupVisible = true;
  }

}
