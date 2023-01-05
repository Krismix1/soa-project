import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import * as fromAuth from './+state/auth.reducer';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    AuthFacade,
    AuthService,
    provideEffects([AuthEffects]),
    provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    // provideHttpClient(withRequestsMadeViaParent()),
  ],
})
export class EsportsAuthDataAccessModule {}
