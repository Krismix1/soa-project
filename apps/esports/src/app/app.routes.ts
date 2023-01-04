import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { EsportsAuthDataAccessModule } from '@project-assignment/esports/auth/data-access';
import { AuthenticatedGuard, LoggedOutGuard } from '@project-assignment/esports/auth/feature';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [AuthenticatedGuard, importProvidersFrom(EsportsAuthDataAccessModule), LoggedOutGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@project-assignment/esports/home/feature').then((mod) => mod.esportsHomeFeatureRoutes),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@project-assignment/esports/auth/feature').then((mod) => mod.esportsFeatureAuthRoutes),
      },
      // {
      //   path: '**',
      //   redirectTo: '/home',
      // },
    ],
  },
];
