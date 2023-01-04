import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SignUpCreds, UserCreds } from '../auth.service';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  authToken$ = this.store.select(AuthSelectors.selectAccessToken);
  tokenDetails$ = this.store.select(AuthSelectors.selectTokenDetails);

  constructor(private readonly store: Store, private actions$: Actions) {}

  logIn(creds: UserCreds) {
    this.store.dispatch(AuthActions.logIn(creds));
    return this.actions$.pipe(ofType(AuthActions.logInSuccess));
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

  signUp(creds: SignUpCreds) {
    this.store.dispatch(AuthActions.signUp(creds));
    return this.actions$.pipe(ofType(AuthActions.signUpSuccess));
  }
}
