import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean>
  {
    if (this.authService.isAuthenticated) {
      
      return true;
    }

    // Sign the user out and redirect.
    this.authService.signOut();
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if authenticated, if not redirect to login
    if (this.authService.isAuthenticated) {
      
      return true;
    }

    // Sign the user out and redirect.
    this.authService.signOut();
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
