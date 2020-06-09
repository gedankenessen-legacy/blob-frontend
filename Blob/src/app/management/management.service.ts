import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { ILocationItem } from '../interfaces/manage/ILocationItem';
import { IUserItem } from '../interfaces/manage/IUserItem';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  demoUsers: Array<IUserItem> = [
    {
      id: 1,
      firstName: 'Matze',
      lastName: 'Müller',
      userName: 'mmüller3',
      password:null,
    },
    {
      id: 2,
      firstName: 'Beate',
      lastName: 'Fuchs',
      userName: 'bfuchs1',
      password:null,
    },
    {
      id: 3,
      firstName: 'Igor',
      lastName: 'Vostok',
      userName: 'ivostok1',
      password:null,
    },
  ];
  demoLocations: Array<ILocationItem> = [
    {
      id: 1,
      name: 'Hauptquartier',
      address: {
        id: 2,
        street: 'Landauerstraße 20',
        zip: '77151',
        city: 'Berlin',
      },
    },
    {
      id: 2,
      name: 'Zweites Lager',
      address: {
        id: 3,
        street: 'Hauptstraße 71a',
        zip: '34125',
        city: 'München',
      }
    },
    {
      id: 3,
      name: 'Auslandserweiterung',
      address: {
        id: 4,
        street: 'Bastil 5',
        zip: '75000',
        city: 'Paris',
      }
    },
  ];

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) { 
    /* this.getAllLocations = this.getAllLocationsDev;
    this.getAllUsers = this.getAllUsersDev;
    this.getLocation = this.getLocationDev;
    this.createLocation = this.createLocationDev;
    this.createUser = this.createUserDev;
    this.deleteLocation = this.deleteLocationDev;
    this.updateLocations = this.updateLocationsDev; */
  }

  getAllLocations(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/location', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllLocationsDev(): Observable<Array<ILocationItem>>{
    return of(this.demoLocations).pipe(delay(2000));
  }

  getAllUsers(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/user', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllUsersDev(): Observable<Array<IUserItem>>{
    return of(this.demoUsers).pipe(delay(2000));
  }

  getLocation(id: number): Observable<ILocationItem>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/location/'+id, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getLocationDev(id: number): Observable<ILocationItem>{
    var order: ILocationItem = this.demoLocations.filter(
      (item: ILocationItem) => item.id == id
    )[0];
    return of(order).pipe(delay(2000));
  }

  createLocation(newLocation:ILocationItem): Observable<any>{
    return this.http
      .post<any>(this.baseService.getBaseUrl + '/location',newLocation, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createLocationDev(newLocation:ILocationItem): Observable<ILocationItem>{
    var maxId: number = Math.max.apply(Math, this.demoLocations.map(function(o) { return o.id; }))
    newLocation.id = maxId+1;
    this.demoLocations = [...this.demoLocations, newLocation]
    return of(newLocation).pipe(delay(2000));
  }

  createUser(newUser:IUserItem): Observable<any>{
    return this.http
      .post<any>(this.baseService.getBaseUrl + '/user',newUser, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  createUserDev(newUser:IUserItem): Observable<IUserItem>{
    var maxId: number = Math.max.apply(Math, this.demoUsers.map(function(o) { return o.id; }))
    newUser.id = maxId+1;
    this.demoUsers = [...this.demoUsers, newUser]
    return of(newUser).pipe(delay(2000));
  }

  deleteLocation(id: number):Observable<any>{
    return this.http
      .delete(this.baseService.getBaseUrl + '/location/'+id, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  deleteLocationDev(id: number): Observable<any>{
    this.demoLocations = this.demoLocations.filter(d => d.id !== id);

    return of(null).pipe(delay(2000));
  }

  updateLocations(updatedLocations:ILocationItem[]): Observable<ILocationItem[]>{
    return this.http
      .put<any>(this.baseService.getBaseUrl + '/location',updatedLocations, this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  updateLocationsDev(updatedLocations:ILocationItem[]): Observable<ILocationItem[]>{

    for(let order of updatedLocations){
      const index = this.demoLocations.findIndex(item => item.id === order.id);
      Object.assign(this.demoLocations[index], order);
    }
    return of(updatedLocations).pipe(delay(2000));
  }
}