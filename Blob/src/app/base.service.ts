import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private baseUrl: string = 'http://localhost:5000/api';

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
