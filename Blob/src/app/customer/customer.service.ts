import { Injectable } from '@angular/core';
import { ICustomerItem } from '../interfaces/customer/ICustomerItem';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  demoCustomer: Array<ICustomerItem> = [
    {
      id: 1,
      firstname: 'Test',
      lastname: 'Reload',
      address: {
        id: 1,
        street: 'Badstraße 24',
        zip: '77654',
        city: 'Offenburg',
      },
      createdAt: '20-05-2020',
    },
    {
      id: 2,
      firstname: 'Test',
      lastname: '2',
      address: {
        id: 1,
        street: 'Badstraße 25',
        zip: '77654',
        city: 'Offenburg',
      },
      createdAt: '20-05-2020',
    },
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) {
    /* this.getAllCustomer = this.getAllCustomerDev;
    this.getCustomer = this.getCustomerDev;
    this.createCustomer = this.createCustomerDev;
    this.deleteCustomer = this.deleteCustomerDev;
    this.updateCustomers = this.updateCustomersDev; */
  }

  getAllCustomer(): Observable<any> {
    return this.http.get<any>(this.baseService.getBaseUrl + '/customer', this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }

  getAllCustomerDev(): Observable<Array<ICustomerItem>> {
    return of(this.demoCustomer).pipe(delay(2000));
  }

  getCustomer(id: number): Observable<ICustomerItem> {
    return this.http.get<any>(this.baseService.getBaseUrl + '/customer/' + id, this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }

  getCustomerDev(id: number): Observable<ICustomerItem> {
    var order: ICustomerItem = this.demoCustomer.filter((item: ICustomerItem) => item.id == id)[0];
    return of(order).pipe(delay(2000));
  }

  createCustomer(newCustomer: ICustomerItem): Observable<any> {
    return this.http.post<any>(this.baseService.getBaseUrl + '/customer', newCustomer, this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }

  createCustomerDev(newCustomer: ICustomerItem): Observable<ICustomerItem> {
    var maxId: number = Math.max.apply(
      Math,
      this.demoCustomer.map(function (o) {
        return o.id;
      })
    );
    newCustomer.id = maxId + 1;
    this.demoCustomer = [...this.demoCustomer, newCustomer];
    return of(newCustomer).pipe(delay(2000));
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.baseService.getBaseUrl + '/customer/' + id, this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }

  deleteCustomerDev(id: number): Observable<any> {
    this.demoCustomer = this.demoCustomer.filter((d) => d.id !== id);

    return of(null).pipe(delay(2000));
  }

  updateCustomers(updatedCustomers: ICustomerItem[]): Observable<ICustomerItem[]> {
    return this.http.put<any>(this.baseService.getBaseUrl + '/customer', updatedCustomers, this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }

  updateCustomersDev(updatedCustomers: ICustomerItem[]): Observable<ICustomerItem[]> {
    for (let order of updatedCustomers) {
      const index = this.demoCustomer.findIndex((item) => item.id === order.id);
      Object.assign(this.demoCustomer[index], order);
    }
    return of(updatedCustomers).pipe(delay(2000));
  }
}
