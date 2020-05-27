import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IProductItem } from '../interfaces/product/IProductItem';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  demoProducts: Array<IProductItem> = [
    {
      id: 1,
      product: 'a',
      sku: 'asdfasfg',
      stock: '10',
      price: 50,
    },
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private baseService: BaseService) {
    this.getAllProducts = this.getAllProductsDev;
  }

  getAllProducts(): Observable<any> {
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/product', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllProductsDev(): Observable<Array<IProductItem>> {
    return of(this.demoProducts).pipe(delay(5000));
  }
}