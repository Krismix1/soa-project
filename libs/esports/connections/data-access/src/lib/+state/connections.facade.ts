import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  FriendConnection,
  GetConnectionDTO,
  IncomingPendingConnection,
  OutgoingPendingConnection,
  UserDetails,
} from '@project-assignment/shared/data-models-api';
import { map } from 'rxjs';

import * as ConnectionsActions from './connections.actions';
import * as ConnectionsSelectors from './connections.selectors';

@Injectable()
export class ConnectionsFacade {
  private readonly store = inject(Store);

  selectedConnections$ = this.store.pipe(select(ConnectionsSelectors.selectAllConnectionsForUser));
  friendConnections$ = this.selectedConnections$.pipe(
    map((conns): FriendConnection[] => conns.filter((conn) => conn.type === 'CONNECTED_WITH') as FriendConnection[]),
  );
  incomingPendingConnections$ = this.selectedConnections$.pipe(
    map(
      (conns): IncomingPendingConnection[] =>
        conns.filter((conn) => conn.type === 'REQUESTED_CONNECTION' && 'from' in conn) as IncomingPendingConnection[],
    ),
  );
  outgoingPendingConnections$ = this.selectedConnections$.pipe(
    map(
      (conns): OutgoingPendingConnection[] =>
        conns.filter((conn) => conn.type === 'REQUESTED_CONNECTION' && 'to' in conn) as OutgoingPendingConnection[],
    ),
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(userId: string) {
    this.store.dispatch(ConnectionsActions.initConnections({ userId }));
  }

  sendFriendRequest(toUser: UserDetails, currentUser: UserDetails) {
    this.store.dispatch(ConnectionsActions.requestFriendConnection({ userId: toUser.id, currentUser }));
  }

  deleteFriend(connection: GetConnectionDTO, currentUser: UserDetails) {
    const user = 'to' in connection ? connection.to : connection.from;
    this.store.dispatch(ConnectionsActions.deleteFriend({ userId: user.id, currentUser }));
  }

  deletePendingConnection(connection: GetConnectionDTO, currentUser: UserDetails) {
    const user = 'to' in connection ? connection.to : connection.from;
    this.store.dispatch(ConnectionsActions.deletePendingConnection({ userId: user.id, currentUser }));
  }

  acceptFriendRequest(connection: GetConnectionDTO, currentUser: UserDetails) {
    const user = 'to' in connection ? connection.to : connection.from;
    this.store.dispatch(ConnectionsActions.acceptFriendRequest({ userId: user.id, currentUser }));
  }
}
