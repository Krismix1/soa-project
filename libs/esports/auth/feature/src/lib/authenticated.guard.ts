import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacade.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        return isLoggedIn
          ? true
          : this.router.createUrlTree(['/account/login'], { queryParams: { redirectTo: state.url } });
      }),
    );
  }
}
