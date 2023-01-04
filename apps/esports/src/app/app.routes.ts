import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@project-assignment/esports/auth/feature').then((mod) => mod.esportsFeatureAuthRoutes),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
