import { Injectable } from '@angular/core';
import { ICustomerItem } from '../interfaces/customer/ICustomerItem';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  demoCustomer: Array<ICustomerItem> = [
    {
      id: 1,
      firstname: "Test",
      lastname: "Reload",
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
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) { 
    //this.getAllCustomer = this.getAllCustomerDev;
    //this.createCustomer = this.createCustomerDev;
  }

  getAllCustomer(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/customer', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllCustomerDev(): Observable<Array<ICustomerItem>>{
    return of(this.demoCustomer).pipe(delay(2000));
  }

  createCustomer(newCustomer:ICustomerItem): Observable<any>{
    return this.http
      .post<any>(this.baseService.getBaseUrl + '/customer',newCustomer, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createCustomerDev(newCustomer:ICustomerItem): Observable<ICustomerItem>{
    return of(newCustomer).pipe(delay(2000));
  }
}
