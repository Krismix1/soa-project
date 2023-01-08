import { Route } from '@angular/router';
import { EsportsHomeFeatureComponent } from './esports-home-feature/esports-home-feature.component';
import { FeedComponent } from './feed/feed.component';

export const esportsHomeFeatureRoutes: Route[] = [
  {
    path: '',
    component: EsportsHomeFeatureComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: FeedComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@project-assignment/esports/users/feature').then((mod) => mod.esportsUsersFeatureRoutes),
      },
    ],
  },
];
