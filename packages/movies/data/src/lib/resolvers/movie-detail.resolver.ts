import { Movie } from '@org/movies-models';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';

export const movieDetailsResolver: ResolveFn<Movie> = (route: ActivatedRouteSnapshot): Observable<Movie> => {
  const movieId = route.paramMap.get('id');
  const moviesService = inject(MoviesService);

  if (!movieId) {
    throw new Error('Movie id is required');
  }

  return moviesService.getMovieDetails(movieId);
};
