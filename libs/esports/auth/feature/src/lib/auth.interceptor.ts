import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade, EXCLUDE_REQUEST } from '@project-assignment/esports/auth/data-access';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  const ignoreRequest = req.context.get(EXCLUDE_REQUEST);
  if (ignoreRequest) {
    return next(req);
  }

  return authFacade.authToken$.pipe(
    switchMap((authToken) => {
      if (authToken !== undefined) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
      }
      return next(req);
    }),
    catchError((err) => {
      router.navigateByUrl('/account/login');
      return throwError(() => err);
    }),
  );
};
