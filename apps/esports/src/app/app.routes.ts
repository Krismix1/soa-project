import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { EsportsAuthDataAccessModule } from '@project-assignment/esports/auth/data-access';
import { AuthenticatedGuard, LoggedOutGuard } from '@project-assignment/esports/auth/feature';
import { MESSAGES_WS_TOKEN } from '@project-assignment/esports/chat-messages/data-access';
import { environment } from '../environments/environment';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [
      AuthenticatedGuard,
      importProvidersFrom(EsportsAuthDataAccessModule),
      LoggedOutGuard,
      { provide: MESSAGES_WS_TOKEN, useValue: environment.messagesWebsocketUrl },
    ],
    children: [
      {
        path: '',
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
