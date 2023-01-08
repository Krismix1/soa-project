import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { Action, ActionReducer, MetaReducer, provideStore, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AUTH_FEATURE_KEY, EsportsAuthDataAccessModule } from '@project-assignment/esports/auth/data-access';
import { authInterceptor } from '@project-assignment/esports/auth/feature';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function localStorageSyncReducer(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
  return localStorageSync({ keys: [{ [AUTH_FEATURE_KEY]: ['accessToken'] }], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<unknown, Action>> = [localStorageSyncReducer];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideEffects(),
    provideStore(),
    provideStoreDevtools({
      logOnly: !isDevMode(),
    }),
    provideRouterStore(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(EsportsAuthDataAccessModule),
    { provide: USER_PROVIDED_META_REDUCERS, useValue: metaReducers }, // https://github.com/ngrx/platform/pull/2131
  ],
}).catch((err) => console.error(err));
