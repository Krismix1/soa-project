import { createAction, props } from '@ngrx/store';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { ConnectionsEntity } from './connections.models';

export const initConnections = createAction('[Connections Page] Init', props<{ userId: string }>());

export const loadConnectionsSuccess = createAction(
  '[Connections/API] Load Connections Success',
  props<{ userId: string; connections: ConnectionsEntity[] }>(),
);

export const loadConnectionsFailure = createAction(
  '[Connections/API] Load Connections Failure',
  props<{ error: string }>(),
);

export const requestFriendConnection = createAction(
  '[Connections Page] Request friend connection',
  props<{ userId: string | number; currentUser: UserDetails }>(),
);

export const deleteFriend = createAction(
  '[Connections Page] Delete friend',
  props<{ userId: string | number; currentUser: UserDetails }>(),
);

export const deletePendingConnection = createAction(
  '[Connections Page] Delete pending connection',
  props<{ userId: string | number; currentUser: UserDetails }>(),
);

export const acceptFriendRequest = createAction(
  '[Connections Page] Accept friend request',
  props<{ userId: string | number; currentUser: UserDetails }>(),
);

export const selectUser = createAction('[Connection page] Select user', props<{ id: number | string }>());
