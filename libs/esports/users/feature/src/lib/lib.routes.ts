import { Route } from '@angular/router';
import { EsportsUsersFeatureComponent } from './esports-users-feature/esports-users-feature.component';

export const esportsUsersFeatureRoutes: Route[] = [{ path: ':id', component: EsportsUsersFeatureComponent }];
