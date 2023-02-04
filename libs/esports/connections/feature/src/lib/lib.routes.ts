import { Route } from '@angular/router';
import { EsportsConnectionsFeatureComponent } from './esports-connections-feature/esports-connections-feature.component';

export const esportsConnectionsFeatureRoutes: Route[] = [
  {
    path: 'friends',
    component: EsportsConnectionsFeatureComponent,
  },
];
