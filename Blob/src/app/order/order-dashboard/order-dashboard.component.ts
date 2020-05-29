import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { IOrderItem } from 'src/app/interfaces/order/IOrderItem';
import { EOrderState } from 'src/app/enums/order/eorder-state.enum';
import { OrderService } from '../order.service';
import { IOrderState } from 'src/app/interfaces/order/IOrderState';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.less']
})
export class OrderDashboardComponent implements OnInit {
  searchValue: string = '';
  visible: boolean = false;
  isOrdersLoading = true;
  currentState: EOrderState = EOrderState.notPaid;
  tabs:IOrderState[] = [
    {
      value: "Nicht Bezahlt",
      id: EOrderState.notPaid,
    }, 
    {
      value: "Bezahlt",
      id: EOrderState.paid,
    },
    {
      value: "In-Bearbeitung",
      id: EOrderState.inProcessing,
    }, 
    {
      value: "Versand",
      id: EOrderState.shipping,
    }, 
    {
      value: "Archiviert",
      id: EOrderState.archived,
    },
  ];

  constructor(private titleService:TitleService, private orderService: OrderService) {
    this.titleService.Title = 'Bestellungen';
  }

  ngOnInit(): void {
    this.tabChanged(EOrderState.notPaid);
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.listOfData = data;
        this.updateListOfDisplayData();
        this.isOrdersLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /********************************************
   ** Liste aller Bestellungen               **
   *******************************************/
  listOfData: IOrderItem[] = [];

  tabChanged(state:EOrderState):void{
    this.currentState = state;
    this.updateListOfDisplayData();
  }

  updateListOfDisplayData():void{
    console.log(this.listOfData);
    
    this.listOfDisplayData = this.listOfData.filter(
      (item: IOrderItem) => item.state.id == this.currentState
    );
  }

  selectChanged(newState: EOrderState, id: number): void{
    console.log("id: "+id);
    
    var order:IOrderItem = this.listOfData.find(item => {
      return item.id == id
    });

    order.state.id = newState;
    this.isOrdersLoading = true;
    this.orderService.updateOrders([order]).subscribe(
      (data) => {
        console.log(data);
        this.currentState = newState;
        
        this.updateListOfDisplayData();
        this.isOrdersLoading = false;
      },
      (error) => {
        console.error(error);
      }
    ); 
  }

  /********************************************
   ** Bestellung Suche                       **
   *******************************************/
  listOfDisplayData = [...this.listOfData];
  search() {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      //TODO Suche fixen auch reset
      (item: IOrderItem) => item.id == Number(this.searchValue) && item.state.id==this.currentState
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
