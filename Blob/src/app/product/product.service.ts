import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IProductItem } from '../interfaces/IProductItem';
import { IProductLocationItem } from '../interfaces/IProductLocationItem';
import { ICategoryItem } from '../interfaces/ICategoryItem';
import { ILocationItem } from '../interfaces/ILocationItem';

let isDebug: boolean = true;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  demoLocations: Array<ILocationItem> = [
    {
      id: 1,
      name: "Test Filiale 1",
    }    
  ];

  demoCategory: Array<ICategoryItem> = [
    {
      id: 1,
      name: 'Reifen'
    },
  ];


  demoProducts: Array<IProductItem> = [
    {
      id: 1,
      productservice: 'product',
      name: 'Dunlop Sport Classic 195/65 R18 91V',
      sku: '5452000811332',
      location: {
        locationId: 1,
        productId: 1,
        quantity: 1,
      },
      category: {
        id: 1,
        name: "Reifen",
      },
      property: {
        id: 1,
        name: "Größe",
        value: "235 70 R18",
      },
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
    .get<any>(this.baseService.getBaseUrl + '/location'+id, this.httpOptions)
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

  /* TODO: Wie erstellt man eine Kategorie? */
  createCategory(category: string): Observable<any> {
    return this.http
      .post<any>(this.baseService.getBaseUrl + "/product/addedit/", this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  /* createCategoryDev(category: string): Observable<any> {
    this.demoCategory = [
      ...this.demoCategory,
      {
        name: category
      },
    ];
    return of(this.demoCategory).pipe(delay(1000));
  } */
}