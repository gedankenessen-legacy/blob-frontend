import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  willExpiresIn: Date;


  /**
   * Checks if the user is Authenticated.
   * @returns True if the user is Authenticated.
   */
  public get isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  constructor(private router: Router, private http: HttpClient, private baseService: BaseService) {}

  /**
   * This method checks if the Token is expired.
   * @returns   'true' if the token is still valid, otherwise 'false'.
   */
  private isTokenValid(): boolean {

    //TODO: ONLY FOR DEBUGGING: IGNORE TOKEN
    return true;

    // Check if the token is expired
    if (this.willExpiresIn > new Date()) {
      return true;
    }
    return false;
  }

  /**
   * This method is used to authenticate a user and storing a token, which is need to call resources from the API.
   * @param username The username.
   * @param password The password.
   */
  public signIn(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = new HttpParams().set('grant_type', 'password').set('username', username).set('password', password);

    // Create a http req on the auth api.
    // Store the token if the req was successful.
    return this.http.post<any>(this.baseService.getBaseUrl + '/token', body.toString(), httpOptions);
  }

  /**
   * This method signs the user out, deletes the stored token and redirect the user to the Login-Page.
   * @returns 'true' if the signOut was successful.
   */
  public signOut(): boolean {
    // Remove the stored token from the browser storage.
    localStorage.removeItem('token');
    this.willExpiresIn = null;

    this.router.navigate(['/login']);
    return true;
  }
}
