import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { EsportsAuthDataAccessModule } from '@project-assignment/esports/auth/data-access';
import { LoggedOutGuard } from './logged-out.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const esportsFeatureAuthRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [LoggedOutGuard, importProvidersFrom(EsportsAuthDataAccessModule)],
    children: [
      { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [LoggedOutGuard] },
    ],
  },
];
