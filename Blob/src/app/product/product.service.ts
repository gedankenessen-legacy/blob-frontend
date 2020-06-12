import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IProductItem } from '../interfaces/product/IProductItem';
import { IProductLocationItem } from '../interfaces/product/IProductLocationItem';
import { ICategoryItem } from '../interfaces/product/ICategoryItem';
import { ILocationItem } from '../interfaces/product/ILocationItem';
import { IPropertyItem } from '../interfaces/product/IPropertyItem';

let isDebug: boolean = false;


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  demoLocations: Array<ILocationItem> = [
    {
      id: 1,
      name: "Test Filiale 1",
    },
    {
      id: 2,
      name: "Test Filiale 2",
    }    
  ];

  demoProductLocation: Array<IProductLocationItem> = [
    {
      locationId: 1,
      productId: 1,
      quantity: 10,
    }
  ]

  demoCategory: Array<ICategoryItem> = [
    {
      id: 1,
      name: 'Winter Reifen'
    },
    {
      id: 2,
      name: 'Sommer Reifen'
    },
    {
      id: 3,
      name: 'Ganzjahres Reifen'
    },
  ];

  demoProperty: Array<IPropertyItem> = [
    {
      id: 1,
      name: "Größe",
      value: "235 70 R18",
    },
  ];


  demoProducts: Array<IProductItem> = [
    {
      id: 1,
      name: 'Dunlop Sport Classic 195/65 R18 91V',
      sku: '5452000811332',
      productsAtLocations: this.demoProductLocation,
      categories: this.demoCategory,
      properties: this.demoProperty,
      price: 145.13,
    }
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private baseService: BaseService) {
    if(isDebug) {
      this.getAllLocations = this.getAllLocationsDev;
      this.getAllProducts = this.getAllProductsDev;
      this.createProduct = this.createProductDev;
      this.deleteProduct = this.deleteProductDev;
    }
  }

  /* Alle Locations */
  getAllLocations(): Observable<Array<ILocationItem>> {
    return this.http
    .get<any>(this.baseService.getBaseUrl + '/location', this.httpOptions)
    .pipe(catchError(this.baseService.errorHandle));
  }

  /* Alle Demo Locations */
  getAllLocationsDev(): Observable<Array<ILocationItem>> {
    return of(this.demoLocations).pipe(delay(1000));
  }

  /* Location mit ID */ 
  getLocations(id: number): Observable<ILocationItem> {
    return this.http
    .get<any>(this.baseService.getBaseUrl + '/location/'+id, this.httpOptions)
    .pipe(catchError(this.baseService.errorHandle));
  }

  /* Demo Location mit ID */ 
  getLocationsDev(id: number): Observable<ILocationItem> {
    var location: ILocationItem = this.demoLocations.filter(
      (item: ILocationItem) => item.id == id
    )[0];

    return of(location).pipe(delay(1000));
  }

  /* Alle Produkte */ 
  getAllProducts(): Observable<any> {
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/product', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  /* Alle Demo Produkte */ 
  getAllProductsDev(): Observable<Array<IProductItem>> {
    return of(this.demoProducts).pipe(delay(1000));
  }

  /* Produkte mit ID*/ 
  getProduct(id: number): Observable<any> {
    return this.http
      .get(this.baseService.getBaseUrl + '/product/'+id, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }


  /*  Erstelle neues Produkt */
  createProduct(newProduct:IProductItem): Observable<any> {
    return this.http
      .post<any>(this.baseService.getBaseUrl + "/product", newProduct, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  /* Erstelle neues Demo Produkt */
  createProductDev(newProduct:IProductItem): Observable<any> {
    var maxId: number = Math.max.apply(Math, this.demoProducts.map(function(o) { return o.id; }))
    newProduct.id = maxId+1;
    this.demoProducts = [...this.demoProducts, newProduct]
    return of(newProduct).pipe(delay(2000));
  }

  /*  Update Produkt */
  updateProduct(newProduct:IProductItem[]): Observable<any> {
    return this.http
      .put<any>(this.baseService.getBaseUrl + "/product", newProduct, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  /* Lösche Produkt mit ID */
  deleteProduct(id: number):Observable<any>{
    return this.http
      .delete(this.baseService.getBaseUrl + '/product/'+id, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  /* Lösche Demo Produkt mit ID */
  deleteProductDev(id: number): Observable<any>{
    this.demoProducts = this.demoProducts.filter(d => d.id !== id);
    return of(null).pipe(delay(2000));
  }

  getAllCategorys(): Observable<any> {
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/product/categories', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }
}