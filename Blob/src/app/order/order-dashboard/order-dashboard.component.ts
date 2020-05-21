import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { EOrderState } from 'src/app/enums/order/eorder-state.enum';
import { ITabContent } from 'src/app/interfaces/order/ITabContent';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.less']
})
export class OrderDashboardComponent implements OnInit {
  searchValue: string = '';
  visible: boolean = false;
  currentState: EOrderState = EOrderState.notPaid;
  tabs:ITabContent[] = [
    {
      title: "Nicht Bezahlt",
      state: EOrderState.notPaid,
    }, 
    {
      title: "Bezahlt",
      state: EOrderState.paid,
    },
    {
      title: "In-Bearbeitung",
      state: EOrderState.inProcessing,
    }, 
    {
      title: "Versand",
      state: EOrderState.shipping,
    }, 
    {
      title: "Archiviert",
      state: EOrderState.archived,
    },
  ];

  constructor(private titleService:TitleService) {}

  ngOnInit(): void {
    this.titleService.Title = 'Bestellungen';
    this.tabChanged(EOrderState.notPaid);
  }

  /********************************************
   ** Liste aller Kunden                   **
   *******************************************/
  listOfData: IOrderItem[] = [
    {
      id: 1,
      locationId: 1,
      customer: {
        id: 3,
        firstName: "Test",
        lastName: "1",
        address: "Badstraße 24, 77654 Offenburg",
        createdAt: "20-05-2020",
      },
      createdAt: "21.05.2020",
      orderedProduct:null,
      state: EOrderState.notPaid,
    },
    {
      id: 2,
      locationId: 1,
      customer: {
        id: 2,
        firstName: "Test",
        lastName: "2",
        address: "Badstraße 24, 77654 Offenburg",
        createdAt: "20-05-2020",
      },
      createdAt: "21.05.2020",
      orderedProduct:null,
      state: EOrderState.paid,
    }
  ];

  tabChanged(state:EOrderState):void{
    this.currentState = state;
    this.listOfDisplayData = this.listOfData.filter(
      (item: IOrderItem) => item.state == state
    );
  }

  /********************************************
   ** Bestellung Suche                       **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      //TODO Suche fixen
      (item: IOrderItem) => item.id == Number(this.searchValue) && item.state==this.currentState
    );
  }

  /********************************************
   ** Bestellung Suche zurücksetzten         **
   ********************************************/
  reset() {
    this.searchValue = '';
    this.search();
  }
}
