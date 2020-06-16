import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ICustomerItem } from 'src/app/interfaces/customer/ICustomerItem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/title.service';
import { CustomerService } from '../customer.service';
import { IAdress } from 'src/app/interfaces/IAdress';
import { NzModalService } from 'ng-zorro-antd';

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

  constructor(private modal: NzModalService, private fb: FormBuilder, private titleService: TitleService, private customerService: CustomerService) {
    this.titleService.Title = 'Kunden';
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required),
      id: new FormControl(0, Validators.required),
    });

    this.getAllCustomer();
  }

  getAllCustomer() {
    this.isLoading = true;
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        this.listOfData = data;
        this.listOfDisplayData = data;

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Kunden ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
        });
      }
    );
  }

  addNewCustomer() {
    this.isSaving = true;
    var address: IAdress = {
      id: 0,
      street: this.addForm.controls['street'].value,
      zip: this.addForm.controls['zip'].value,
      city: this.addForm.controls['city'].value,
    };
    var newCustomerItem: ICustomerItem = {
      id: 0,
      firstname: this.addForm.controls['firstname'].value,
      lastname: this.addForm.controls['lastname'].value,
      address: address,
      createdAt: null,
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
        this.isSaving = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Anlegen des Kunden ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
        });
      }
    );
  }

  updateCustomer(id: number) {
    this.isSaving = true;

    var customers: ICustomerItem[] = this.listOfData.filter((item: ICustomerItem) => item.id == id);

    var customer: ICustomerItem = customers[0];

    var address: IAdress = {
      id: customer.address.id,
      street: this.addForm.controls['street'].value,
      zip: this.addForm.controls['zip'].value,
      city: this.addForm.controls['city'].value,
    };

    var newCustomerItem: ICustomerItem = {
      id: id,
      firstname: this.addForm.controls['firstname'].value,
      lastname: this.addForm.controls['lastname'].value,
      address: address,
      createdAt: customer.createdAt,
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
        this.isSaving = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Bearbeiten des Kunden ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
        });
      }
    );
  }
  /********************************************
   ** Liste aller Kunden                   **
   *******************************************/
  listOfData: ICustomerItem[] = [];

  /********************************************
   ** Kundensuche                            **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: ICustomerItem) => (item.firstname + ' ' + item.lastname).indexOf(this.searchValue) !== -1);
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
    if (this.addForm.controls['id'].value == 0) {
      this.addNewCustomer();
    } else {
      this.updateCustomer(this.addForm.controls['id'].value);
    }
  }

  editButtonClicked(id: number): void {
    console.log('Edit clicked');

    var customers: ICustomerItem[] = this.listOfData.filter((item: ICustomerItem) => item.id == id);

    var customer: ICustomerItem = customers[0];

    this.addForm.controls['firstname'].setValue(customer.firstname);
    this.addForm.controls['lastname'].setValue(customer.lastname);
    this.addForm.controls['street'].setValue(customer.address.street);
    this.addForm.controls['zip'].setValue(customer.address.zip);
    this.addForm.controls['city'].setValue(customer.address.city);
    this.addForm.controls['id'].setValue(customer.id);

    this.isPopupVisible = true;
  }

  copyButtonClicked(id: number): void {
    console.log('copy clicked');

    this.isLoading = true;

    var customers: ICustomerItem[] = this.listOfData.filter((item: ICustomerItem) => item.id == id);

    var customer: ICustomerItem = customers[0];

    this.addForm.controls['firstname'].setValue(customer.firstname);
    this.addForm.controls['lastname'].setValue(customer.lastname);
    this.addForm.controls['street'].setValue(customer.address.street);
    this.addForm.controls['zip'].setValue(customer.address.zip);
    this.addForm.controls['city'].setValue(customer.address.city);
    this.addForm.controls['id'].setValue(0);

    this.isPopupVisible = true;
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
