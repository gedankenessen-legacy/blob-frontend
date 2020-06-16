import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  //private baseUrl: string = 'https://localhost:5001/api';
  //private baseUrl: string = 'https://localhost:44383/api';
  // Prod Docker
  private baseUrl: string = 'http://10.10.10.2/api';
  
  constructor() {}

  public get getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Method for services to handle errors.
   * @param error The error obj.
   */
  public errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
