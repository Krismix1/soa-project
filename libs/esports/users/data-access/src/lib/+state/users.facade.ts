import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);
  currentUser$: Observable<UserDetails | undefined> = this.store.select(UsersSelectors.selectCurrentUserDetails);

  loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  selectedUser$ = this.store.pipe(select(UsersSelectors.selectEntity));
  selectIsSelectedUserTheLoggedInUser$ = this.store.pipe(select(UsersSelectors.selectIsSelectedUserTheLoggedInUser));
  selectIsCurrentUserFriendWithSelectedUser$ = this.store.pipe(
    select(UsersSelectors.selectIsCurrentUserFriendWithSelectedUser),
  );
  selectHasCurrentUserOutgoingPendingConnectionWithSelectedUser$ = this.store.pipe(
    select(UsersSelectors.selectHasCurrentUserOutgoingPendingConnectionWithSelectedUser),
  );
  selectHasCurrentUserIncomingPendingConnectionWithSelectedUser$ = this.store.pipe(
    select(UsersSelectors.selectHasCurrentUserIncomingPendingConnectionWithSelectedUser),
  );
  selectCurrentUserConnections$ = this.store.pipe(select(UsersSelectors.selectCurrentUserConnections));

  getCurrentUser() {
    return this.store.dispatch(UsersActions.getCurrentUserDetails());
  }

  getUserDetails(id: number) {
    return this.store.dispatch(UsersActions.getUserDetails({ id }));
  }
}
