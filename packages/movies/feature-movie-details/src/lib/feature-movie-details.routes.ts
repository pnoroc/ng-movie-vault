import { Routes } from '@angular/router';
import { MovieDetailsComponent } from '@org/mv-feature-movie-details';
import { movieDetailsResolver } from '../../../data/src/lib/resolvers/movie-detail.resolver';

export const featureMovieDetailsRoutes: Routes = [
  {
    path: '',
    component: MovieDetailsComponent,
    resolve: {
      movie: movieDetailsResolver
    }
  },
];
