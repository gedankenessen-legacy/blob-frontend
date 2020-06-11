import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private baseService: BaseService) {}

  public getAllOrders(): Observable<any> {
    return this.http.get<any>(this.baseService.getBaseUrl + '/order', this.httpOptions).pipe(catchError(this.baseService.errorHandle));
  }
}
