import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import * as fromUsers from './+state/users.reducer';
import { UserService } from './user.service';

@NgModule({
  providers: [
    provideEffects([UsersEffects]),
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    UserService,
    UsersFacade,
  ],
})
export class EsportsUsersDataAccessModule {}
