import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        return !isLoggedIn ? true : this.router.createUrlTree(['/home']);
      }),
    );
  }
}
