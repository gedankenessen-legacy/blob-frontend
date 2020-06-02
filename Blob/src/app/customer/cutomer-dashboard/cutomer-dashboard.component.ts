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
  isSaving: boolean = false;
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private titleService: TitleService, private customerService: CustomerService) {
    this.titleService.Title = 'Kunden';
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required),
      id: new FormControl(-1, Validators.required),
    });

    this.getAllCustomer();
  }

  getAllCustomer() {
    console.log('get all customer');

    this.customerService.getAllCustomer().subscribe(
      (data) => {
        console.log(data);

        this.listOfData = [];
        this.listOfDisplayData = [];
        this.listOfData = data;
        this.listOfDisplayData = data;
        console.log(this.listOfDisplayData);

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addNewCustomer() {
    this.isSaving = true;
    var address: IAdress = {
      id: -1,
      street: this.addForm.controls['street'].value,
      zip: this.addForm.controls['zip'].value,
      city: this.addForm.controls['city'].value,
    };
    var newCustomerItem: ICustomerItem = {
      id: 4,
      firstname: this.addForm.controls["firstname"].value,
      lastname: this.addForm.controls["lastname"].value,
      address: address,
      createdAt: '20-05-2020',
    };

    this.customerService.createCustomer(newCustomerItem).subscribe(
      (data) => {
        console.log(data);
        this.isPopupVisible = false;
        this.isSaving = false;
        this.isLoading = true;
        this.getAllCustomer();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCustomer(id: number) {
    this.isSaving = true;
    var address: IAdress = {
      id: -1,
      street: this.addForm.controls['street'].value,
      zip: this.addForm.controls['zip'].value,
      city: this.addForm.controls['city'].value,
    };
    var newCustomerItem: ICustomerItem = {
      id: id,
      firstname: this.addForm.controls['firstname'].value,
      lastname: this.addForm.controls['lastname'].value,
      address: address,
      createdAt: '20-05-2020',
    };

    this.customerService.updateCustomers([newCustomerItem]).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = true;
        this.isPopupVisible = false;
        this.isSaving = false;
        this.getAllCustomer();
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

  submitAddForm(): void {
    console.log('Add clicked');
    if (this.addForm.controls['id'].value == -1) {
      this.addNewCustomer();
    } else {
      this.updateCustomer(this.addForm.controls['id'].value);
    }
  }

  editButtonClicked(id: number): void {
    console.log('Edit clicked');

    this.isLoading = true;

    this.customerService.getCustomer(id).subscribe(
      (data) => {
        console.log(data);

        var customer: ICustomerItem = data;

        this.addForm.controls['firstname'].setValue(customer.firstname);
        this.addForm.controls['lastname'].setValue(customer.lastname);
        this.addForm.controls['street'].setValue(customer.address.street);
        this.addForm.controls['zip'].setValue(customer.address.zip);
        this.addForm.controls['city'].setValue(customer.address.city);
        this.addForm.controls['id'].setValue(customer.id);

        this.isPopupVisible = true;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  copyButtonClicked(id: number): void {
    console.log('copy clicked');

    this.isLoading = true;

    this.customerService.getCustomer(id).subscribe(
      (data) => {
        console.log(data);

        var customer: ICustomerItem = data;

        this.addForm.controls['firstname'].setValue(customer.firstname);
        this.addForm.controls['lastname'].setValue(customer.lastname);
        this.addForm.controls['street'].setValue(customer.address.street);
        this.addForm.controls['zip'].setValue(customer.address.zip);
        this.addForm.controls['city'].setValue(customer.address.city);

        this.isPopupVisible = true;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteButtonClicked(id: number): void {
    console.log('delete clicked');

    this.isLoading = true;

    this.customerService.deleteCustomer(id).subscribe(
      (data) => {
        console.log(data);
        this.getAllCustomer();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
