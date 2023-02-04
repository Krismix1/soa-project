import { Action, createReducer, on } from '@ngrx/store';
import { GetConnectionDTO } from '@project-assignment/shared/data-models-api';

import * as ConnectionsActions from './connections.actions';

export const CONNECTIONS_FEATURE_KEY = 'connections';

export interface ConnectionsState {
  connections?: Record<string, GetConnectionDTO[]>;
  userId?: string | number;
}

export interface ConnectionsPartialState {
  readonly [CONNECTIONS_FEATURE_KEY]: ConnectionsState;
}

export const initialConnectionsState: ConnectionsState = {};

const reducer = createReducer(
  initialConnectionsState,
  on(
    ConnectionsActions.loadConnectionsSuccess,
    (state, { connections, userId }): ConnectionsState => ({
      ...state,
      userId,
      connections: { ...state.connections, [userId]: connections },
    }),
  ),
  on(ConnectionsActions.selectUser, (state, { id }): ConnectionsState => ({ ...state, userId: id })),
);

export function connectionsReducer(state: ConnectionsState | undefined, action: Action) {
  return reducer(state, action);
}
