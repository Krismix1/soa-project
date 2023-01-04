import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginResponse } from '@project-assignment/shared/data-models-api';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logIn),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((response: LoginResponse) => AuthActions.logInSuccess(response)),
          catchError((err: HttpErrorResponse) => of(AuthActions.logInFailure({ error: err.message }))),
        ),
      ),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) =>
        this.authService.signUp(action).pipe(
          map(() => AuthActions.signUpSuccess()),
          catchError((err: HttpErrorResponse) => of(AuthActions.signUpFailure({ error: err.message }))),
        ),
      ),
    );
  });

  constructor(private readonly actions$: Actions, private authService: AuthService) {}
}
