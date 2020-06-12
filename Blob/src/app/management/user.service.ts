import { Injectable } from '@angular/core';
import { IUserItem } from '../interfaces/manage/IUserItem';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private baseService: BaseService) { 
    /* this.getAllUsers = this.getAllUsersDev;
    this.createUser = this.createUserDev; */
  }

  getAllUsers(): Observable<any>{
    return this.http
      .get<any>(this.baseService.getBaseUrl + '/user', this.httpOptions)
      .pipe(catchError(this.baseService.errorHandle));
  }

  getAllUsersDev(): Observable<Array<IUserItem>>{
    return of(this.demoUsers).pipe(delay(2000));
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
}
