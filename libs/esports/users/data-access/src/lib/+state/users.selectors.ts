import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectionsState, selectConnectionsState } from '@project-assignment/esports/connections/data-access';
import { GetConnectionDTO, UserDetails } from '@project-assignment/shared/data-models-api';
import { usersAdapter, UsersState, USERS_FEATURE_KEY } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersLoaded = createSelector(selectUsersState, (state: UsersState) => state.loaded);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);

export const selectCurrentUserDetails = createSelector(
  selectUsersState,
  (state: UsersState): UserDetails | undefined => state.currentUser,
);

export const selectIsSelectedUserTheLoggedInUser = createSelector(
  selectCurrentUserDetails,
  selectEntity,
  (currentUser: UserDetails | undefined, selectedUser: UserDetails | undefined): boolean => {
    if (currentUser && selectedUser) {
      return currentUser.id === selectedUser.id;
    }
    return false;
  },
);

export const selectCurrentUserConnections = createSelector(
  selectCurrentUserDetails,
  selectConnectionsState,
  (currentUser: UserDetails | undefined, { connections }: ConnectionsState): GetConnectionDTO[] | undefined => {
    if (currentUser) {
      return connections?.[currentUser.id];
    }
    return undefined;
  },
);

export const selectIsCurrentUserFriendWithSelectedUser = createSelector(
  selectCurrentUserDetails,
  selectCurrentUserConnections,
  selectEntity,
  (
    currentUser: UserDetails | undefined,
    connections: GetConnectionDTO[] | undefined,
    selectedUser: UserDetails | undefined,
  ): boolean => {
    if (currentUser && connections && selectedUser) {
      return connections.find((conn) => conn.type === 'CONNECTED_WITH' && conn.to.id === selectedUser.id) !== undefined;
    }
    return false;
  },
);

export const selectHasCurrentUserOutgoingPendingConnectionWithSelectedUser = createSelector(
  selectCurrentUserDetails,
  selectCurrentUserConnections,
  selectEntity,
  (
    currentUser: UserDetails | undefined,
    connections: GetConnectionDTO[] | undefined,
    selectedUser: UserDetails | undefined,
  ): boolean => {
    if (currentUser && connections && selectedUser) {
      return (
        connections.find(
          (conn) => conn.type === 'REQUESTED_CONNECTION' && 'to' in conn && conn.to.id == selectedUser.id,
        ) !== undefined
      );
    }
    return false;
  },
);

export const selectHasCurrentUserIncomingPendingConnectionWithSelectedUser = createSelector(
  selectCurrentUserDetails,
  selectCurrentUserConnections,
  selectEntity,
  (
    currentUser: UserDetails | undefined,
    connections: GetConnectionDTO[] | undefined,
    selectedUser: UserDetails | undefined,
  ): boolean => {
    if (currentUser && connections && selectedUser) {
      return (
        connections.find(
          (conn) => conn.type === 'REQUESTED_CONNECTION' && 'from' in conn && conn.from.id == selectedUser.id,
        ) !== undefined
      );
    }
    return false;
  },
);
