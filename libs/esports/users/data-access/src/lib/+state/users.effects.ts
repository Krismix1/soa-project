import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../user.service';

import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  getCurrentUserDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getCurrentUserDetails),
      switchMap(() => {
        return this.userService.getCurrentUserDetails().pipe(
          map((details) => UsersActions.getCurrentUserDetailsSuccess({ user: details })),
          catchError((err: HttpErrorResponse) => of(UsersActions.getCurrentUserDetailsFailure({ error: err.message }))),
        );
      }),
    );
  });

  loadSelectedUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUserDetails),
      switchMap((action) => {
        return this.userService
          .getUserDetails(action.id)
          .pipe(map((user) => UsersActions.getUserDetailsSuccess({ user })));
      }),
    );
  });
}
