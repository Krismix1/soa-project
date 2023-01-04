import { Route } from '@angular/router';
import { LoggedOutGuard } from './logged-out.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const esportsFeatureAuthRoutes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedOutGuard] },
];
