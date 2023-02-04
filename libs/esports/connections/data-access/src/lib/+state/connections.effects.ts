import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, map, of, switchMap } from 'rxjs';
import { ConnectionsService } from '../connections.service';

import * as ConnectionsActions from './connections.actions';

@Injectable()
export class ConnectionsEffects {
  private actions$ = inject(Actions);
  private connectionsService = inject(ConnectionsService);

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConnectionsActions.initConnections),
      exhaustMap((action) =>
        this.connectionsService.getConnections(action.userId).pipe(
          map((connections) => ConnectionsActions.loadConnectionsSuccess({ connections, userId: action.userId })),
          catchError((error: HttpErrorResponse) =>
            of(ConnectionsActions.loadConnectionsFailure({ error: error.statusText })),
          ),
        ),
      ),
    );
  });

  sendFriendRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConnectionsActions.requestFriendConnection),
      exhaustMap((action) =>
        this.connectionsService
          .requestConnection(action.userId)
          .pipe(
            switchMap(() =>
              from([
                ConnectionsActions.initConnections({ userId: action.currentUser.id.toString() }),
                ConnectionsActions.initConnections({ userId: action.userId.toString() }),
              ]),
            ),
          ),
      ),
    );
  });

  deleteFriend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConnectionsActions.deleteFriend),
      exhaustMap((action) =>
        this.connectionsService
          .deleteConnection(action.userId)
          .pipe(
            switchMap(() =>
              from([
                ConnectionsActions.initConnections({ userId: action.currentUser.id.toString() }),
                ConnectionsActions.initConnections({ userId: action.userId.toString() }),
              ]),
            ),
          ),
      ),
    );
  });

  deletePendingConnection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConnectionsActions.deletePendingConnection),
      exhaustMap((action) =>
        this.connectionsService
          .rejectConnection(action.userId)
          .pipe(
            switchMap(() =>
              from([
                ConnectionsActions.initConnections({ userId: action.currentUser.id.toString() }),
                ConnectionsActions.initConnections({ userId: action.userId.toString() }),
              ]),
            ),
          ),
      ),
    );
  });

  acceptFriendRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConnectionsActions.acceptFriendRequest),
      exhaustMap((action) =>
        this.connectionsService
          .acceptConnection(action.userId)
          .pipe(
            switchMap(() =>
              from([
                ConnectionsActions.initConnections({ userId: action.currentUser.id.toString() }),
                ConnectionsActions.initConnections({ userId: action.userId.toString() }),
              ]),
            ),
          ),
      ),
    );
  });
}
