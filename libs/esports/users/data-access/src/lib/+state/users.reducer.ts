import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserDetails } from '@project-assignment/shared/data-models-api';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UserDetails> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
  currentUser?: UserDetails;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UserDetails> = createEntityAdapter<UserDetails>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.getUserDetails, (state, payload): UsersState => ({ ...state, selectedId: payload.id })),
  on(UsersActions.getCurrentUserDetailsSuccess, (state, { user }): UsersState => ({ ...state, currentUser: user })),
  on(UsersActions.getUserDetailsSuccess, (state, { user }): UsersState => usersAdapter.setOne(user, state)),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
