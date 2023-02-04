import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GetConnectionDTO } from '@project-assignment/shared/data-models-api';
import { ConnectionsState, CONNECTIONS_FEATURE_KEY } from './connections.reducer';

// Lookup the 'Connections' feature state managed by NgRx
export const selectConnectionsState = createFeatureSelector<ConnectionsState>(CONNECTIONS_FEATURE_KEY);

export const selectAllConnectionsForUser = createSelector(
  selectConnectionsState,
  (state: ConnectionsState): GetConnectionDTO[] => (state.userId ? state.connections?.[state.userId] : []) ?? [],
);
