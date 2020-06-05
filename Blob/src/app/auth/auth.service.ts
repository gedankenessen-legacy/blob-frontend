import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private debuggee = true;

  /**
   * Checks if the user is Authenticated.
   * @returns True if the user is Authenticated.
   */
  public get isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  /* public get isAuthenticated(): Observable<boolean> {
    return of(this.isTokenValid());
  } */

  constructor(private router: Router) {}

  /**
   * This method checks if the Token is expired.
   * @returns   'true' if the token is still valid, otherwise 'false'.
   */
  private isTokenValid(): boolean {
    // TODO: Check if the token is expired
    return this.debuggee; //! DEBUG: only for debugging!

    return false;
  }

  /**
   * This method is used to authenticate a user and storing a token, which is need to call resources from the API.
   * @param username The username.
   * @param password The password.
   */
  public signIn(username: string, password: string): boolean {
    // TODO: Create a http req on the auth api.
    // TODO: Store the token if the req was successful.
    this.debuggee = true;
    this.router.navigate(['/']);
    return true; //! DEBUG: only for debugging!
  }

  /**
   * This method signs the user out, deletes the stored token and redirect the user to the Login-Page.
   * @returns 'true' if the signOut was successful.
   */
  public signOut(): boolean {
    // TODO: Remove the stored token from the browser storage.
    this.debuggee = false;
    this.router.navigate(['/login']);
    return true; //! DEBUG: only for debugging!
  }
}
