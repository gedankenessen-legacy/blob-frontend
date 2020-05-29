import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IProductItem } from '../interfaces/IProductItem';
import { ILocationItem } from '../interfaces/ILocationItem';
import { IPropertyItem } from '../interfaces/IPropertyItem';
import { ICategoryItem } from '../interfaces/ICategoryItem';

let isDebug: boolean = true;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  demoLocations: Array<ILocationItem> = [
    {
      location: 'Freiburg',
      amount: 100,
    }, 
    {
      location: 'Berlin',
      amount: 50,
    }
  ];

  demoCategory: Array<ICategoryItem> = [
    {
      name: 'Reifen'
    },
    {
      name: 'Felgen'
    }
  ];


  demoProducts: Array<IProductItem> = [
    {
      productservice: 'product',
      product: 'Dunlop Sport Classic 195/65 R18 91V',
      sku: '5452000811332',
      stock: 'Freiburg: 50, Berlin: 10',
      category: 'Reifen',
      price: 145.13,
    },
    {
      productservice: 'product',
      product: 'Dunlop SportClassic MFS 205/65 R18 91V',
      sku: '5452000811370',
      stock: 'Freiburg: 40, Berlin: 4',
      category: 'Reifen',
      price: 187.57,
    },
    {
      productservice: 'product',
      product: 'Goodyear EfficientGrip 2 205/55 R16 91V',
      sku: '5452000682291',
      stock: 'Freiburg: 20',
      category: 'Reifen',
      price: 57.81,
    },
    {
      productservice: 'product',
      product: 'Dunlop Sport Blu Response 205/55 R16 91V',
      sku: '3188649819256',
      stock: 'Berlin: 40',
      category: 'Reifen',
      price: 60.23,
    },
    
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private baseService: BaseService) {
    
    if(isDebug) {
      this.getAllCategorys = this.getAllCategorysDev;
      this.getAllLocations = this.getAllLocationsDev;
      this.getAllProducts = this.getAllProductsDev;
      this.createProduct = this.createProductDev;
    }
  }

  getAllLocations(): Observable<Array<ILocationItem>> {
    return this.http
    .get<any>(this.baseService.getBaseUrl + '/location', this.httpOptions)
    .pipe(catchError(this.baseService.errorHandle));
  }

  getAllLocationsDev(): Observable<Array<ILocationItem>> {
    return of(this.demoLocations).pipe(delay(1000));
  }

  getAllProducts(): Observable<any> {
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/product', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllProductsDev(): Observable<Array<IProductItem>> {
    return of(this.demoProducts).pipe(delay(1000));
  }

  getAllCategorys(): Observable<any> {
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/product', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllCategorysDev(): Observable<Array<ICategoryItem>> {
    return of(this.demoCategory).pipe(delay(1000));
  }

  createProduct(newProduct:IProductItem, newLocation:Array<ILocationItem>, newProperty:Array<IPropertyItem>): Observable<any> {
    return this.http
      .post<any>(this.baseService.getBaseUrl + "/product/addedit", this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createProductDev(newProduct:IProductItem): Observable<any> {
    return of(this.demoProducts).pipe(delay(1000));
  }

  createCategory(category: string): Observable<any> {
    return this.http
      .post<any>(this.baseService.getBaseUrl + "/product/addedit/", this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createCategoryDev(category: string): Observable<any> {
    this.demoCategory = [
      ...this.demoCategory,
      {
        name: category
      },
    ];
    return of(this.demoCategory).pipe(delay(1000));
  }
}
