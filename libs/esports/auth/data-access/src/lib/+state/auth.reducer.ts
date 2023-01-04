import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  access_token?: string;
  loaded: boolean;
  error?: string; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  // set initial required properties
  loaded: false,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.logIn, (state): AuthState => ({ ...state, loaded: false, error: undefined, access_token: undefined })),
  on(
    AuthActions.logInSuccess,
    (state, { access_token }): AuthState => ({ ...state, loaded: true, access_token: access_token }),
  ),
  on(AuthActions.logInFailure, (state, { error }): AuthState => ({ ...state, error })),
  on(AuthActions.logout, (state): AuthState => ({ ...state, access_token: undefined })),
  on(AuthActions.signUp, (state): AuthState => ({ ...state, loaded: false, error: undefined })),
  on(AuthActions.signUpSuccess, (state): AuthState => ({ ...state, loaded: true })),
  on(AuthActions.signUpFailure, (state, { error }): AuthState => ({ ...state, error })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
