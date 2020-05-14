import { Component, OnInit } from '@angular/core';
import { ICustomerItem } from 'src/app/interfaces/customer/icustomer-item';

@Component({
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.less']
})
export class CutomerDashboardComponent implements OnInit {

  searchValue = '';
  visible = false;

  /********************************************
   ** Liste aller Kunden                   **
   *******************************************/
  listOfData: ICustomerItem[] = [
    {
      name: "Kunde 1",
      address: "Adresse 1",
      phone: "0123456789",
      email: "test@web.de",
    },
    {
      name: "Kunde 2",
      address: "Adresse 2",
      phone: "0123456789",
      email: "test@web.de",
    },
    {
      name: "Kunde 3",
      address: "Adresse 3",
      phone: "0123456789",
      email: "test@web.de",
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

  constructor() { }

  ngOnInit(): void {
  }

}
