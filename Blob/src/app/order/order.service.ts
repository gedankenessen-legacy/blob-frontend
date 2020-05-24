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
  demoCustomer: Array<IOrderItem> = [
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

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) { 
    this.getAllOrders = this.getAllOrdersDev;
  }

  getAllOrders(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/order', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllOrdersDev(): Observable<Array<IOrderItem>>{
    return of(this.demoCustomer).pipe(delay(2000));
  }
}
