import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('@org/mv-feature-movies').then((m) => m.featureMoviesRoutes),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
