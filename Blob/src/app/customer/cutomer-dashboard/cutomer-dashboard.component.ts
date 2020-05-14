import { Component, OnInit } from '@angular/core';
import { ICustomerItem } from 'src/app/interfaces/customer/icustomer-item';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TitleService } from 'src/app/title.service';

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

  constructor(private fb:FormBuilder, private titleService:TitleService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      prename: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required)
    })

    this.titleService.Title = 'Kunden';
  }

  /********************************************
   ** Liste aller Kunden                   **
   *******************************************/
  listOfData: ICustomerItem[] = [
    {
      name: 'Kunde 1',
      address: 'Adresse 1',
      phone: '0123456789',
      email: 'test@web.de',
    },
    {
      name: 'Kunde 2',
      address: 'Adresse 2',
      phone: '0123456789',
      email: 'test@web.de',
    },
    {
      name: 'Kunde 3',
      address: 'Adresse 3',
      phone: '0123456789',
      email: 'test@web.de',
    },
  ];

  /********************************************
   ** Kundensuche                            **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ICustomerItem) => item.name.indexOf(this.searchValue) !== -1
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
    
  }
}
