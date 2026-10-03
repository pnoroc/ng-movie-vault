import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './mv-feature-movie-details/movie-details.component';
import { movieDetailsResolver } from '@org/mv-movies-data';

export const featureMovieDetailsRoutes: Routes = [
  {
    path: '',
    component: MovieDetailsComponent,
    resolve: {
      movie: movieDetailsResolver
    }
  },
];
