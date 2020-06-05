import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IOrderItem } from '../interfaces/order/IOrderItem';
import { EOrderState } from '../enums/order/eorder-state.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  demoOrder: Array<IOrderItem> = [
    {
      id: 1,
      customer: {
        id: 3,
        firstname: "Test",
        lastname: "1",
        address: {
          id: 1,
          street: "Badstraße 24",
          zip: "77654",
          city: "Offenburg"
        },
        createdAt: "20-05-2020",
      },
      createdAt: "21.05.2020",
      orderedProducts:null,
      state: {
        id: EOrderState.notPaid,
        value: "Nicht Bezahlt",
      }
    },
    {
      id: 2,
      customer: {
        id: 2,
        firstname: "Test",
        lastname: "2",
        address: {
          id: 1,
          street: "Badstraße 25",
          zip: "77654",
          city: "Offenburg"
        },
        createdAt: "20-05-2020",
      },
      createdAt: "21.05.2020",
      orderedProducts:null,
      state: {
        value: "Bezahlt",
        id: EOrderState.paid,
      }
    }
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) { 
    /*this.getAllOrders = this.getAllOrdersDev;
    this.getOrder = this.getOrderDev;
    this.createOrder = this.createOrderDev;
    this.updateOrders = this.updateOrdersDev;*/
  }

  getAllOrders(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/order', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllOrdersDev(): Observable<Array<IOrderItem>>{
    return of(this.demoOrder).pipe(delay(2000));
  }

  getOrder(id: number): Observable<IOrderItem>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/order/'+id, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getOrderDev(id: number): Observable<IOrderItem>{
    var order: IOrderItem = this.demoOrder.filter(
      (item: IOrderItem) => item.id == id
    )[0];
    return of(order).pipe(delay(2000));
  }

  createOrder(newOrder:IOrderItem): Observable<IOrderItem>{
    return this.http
      .post<any>(this.baseService.getBaseUrl + '/order',newOrder, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createOrderDev(newOrder:IOrderItem): Observable<IOrderItem>{
    var maxId: number = Math.max.apply(Math, this.demoOrder.map(function(o) { return o.id; }))
    newOrder.id = maxId+1;
    this.demoOrder = [...this.demoOrder, newOrder]
    return of(newOrder).pipe(delay(2000));
  }

  updateOrders(updatedOrders:IOrderItem[]): Observable<IOrderItem[]>{
    return this.http
      .put<any>(this.baseService.getBaseUrl + '/order',updatedOrders, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  updateOrdersDev(updatedOrders:IOrderItem[]): Observable<IOrderItem[]>{
    for(let order of updatedOrders){
      var index: number = this.demoOrder.findIndex(
        (item: IOrderItem) => item.id == order.id
      );
      this.demoOrder[index] = order;
    }
    return of(updatedOrders).pipe(delay(2000));
  }
}
