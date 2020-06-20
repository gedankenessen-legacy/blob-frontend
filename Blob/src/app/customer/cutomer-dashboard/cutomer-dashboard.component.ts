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
        this.isPopupVisible = false;
        this.isSaving = false;
        this.isLoading = true;
        this.getAllCustomer();
        this.addForm.reset();
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
        this.isLoading = true;
        this.isPopupVisible = false;
        this.isSaving = false;
        this.getAllCustomer();
        this.addForm.reset();
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
    this.listOfDisplayData = this.listOfData.filter((item: ICustomerItem) => (item.firstname.toLocaleLowerCase() + ' ' + item.lastname.toLocaleLowerCase()).indexOf(this.searchValue.toLocaleLowerCase()) !== -1);
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
    this.isLoading = false;
    this.addForm.reset();
  }

  submitAddForm(): void {
    if (this.addForm.controls['id'].value == 0) {
      this.addNewCustomer();
    } else {
      this.updateCustomer(this.addForm.controls['id'].value);
    }
  }

  editButtonClicked(id: number): void {

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
    this.isLoading = true;

    this.customerService.deleteCustomer(id).subscribe(
      (data) => {
        this.getAllCustomer();
      },
      (error) => {
        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Löschen des Kunden ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.',
        });
      }
    );
  }
}
