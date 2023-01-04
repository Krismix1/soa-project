import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TokenDetails } from './auth.models';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loaded);

export const selectLoginError = createSelector(selectAuthState, (state: AuthState) => state.error);

export const selectAccessToken = createSelector(selectAuthState, (state: AuthState) => state.access_token);
export const selectTokenDetails = createSelector(
  selectAccessToken,
  (access_token: string | undefined): TokenDetails =>
    !access_token ? undefined : JSON.parse(window.atob(access_token.split('.')[1])),
);
