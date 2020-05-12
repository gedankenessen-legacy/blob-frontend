import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Checks if the user is Authenticated.
   * @returns True if the user is Authenticated.
   */
  public get isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  constructor() {}

  /**
   * This method checks if the Token is expired.
   * @returns   'true' if the token is still valid, otherwise 'false'.
   */
  private isTokenValid(): boolean {
    // TODO: Check if the token is expired
    return true; //! DEBUG: only for debugging!

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
    // TODO: Redirect to homepage.
    return true; //! DEBUG: only for debugging!
  }

  /**
   * This method signs the user out, deletes the stored token and redirect the user to the Login-Page.
   * @returns 'true' if the signOut was successful.
   */
  public signOut(): boolean {
    // TODO: Remove the stored token from the browser storage.
    // TODO: Redirect to "/login".
    return true; //! DEBUG: only for debugging!
  }
}
