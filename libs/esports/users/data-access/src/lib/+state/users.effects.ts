import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { UserService } from '../user.service';

import * as ConnectionsActions from '@project-assignment/esports/connections/data-access';
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
      mergeMap((action) => {
        return this.userService
          .getUserDetails(action.id)
          .pipe(
            switchMap((user) =>
              from([UsersActions.getUserDetailsSuccess({ user }), ConnectionsActions.selectUser({ id: user.id })]),
            ),
          );
      }),
    );
  });
}
