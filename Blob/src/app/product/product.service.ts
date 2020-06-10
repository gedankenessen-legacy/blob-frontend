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
      product: 'Produkt 1',
      sku: 'asdfasfg',
      stock: '10',
      price: 50,
    },
    {
      id: 2,
      product: 'Produkt 2',
      sku: 'asdfasfg',
      stock: '10',
      price: 50,
    },
    {
      id: 16,
      product: 'Produkt 3',
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
    return of(this.demoProducts).pipe(delay(1000));
  }
}