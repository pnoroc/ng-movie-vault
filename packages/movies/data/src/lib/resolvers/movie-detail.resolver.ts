import { Movie } from '@org/movies-models';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { catchError, Observable, of } from 'rxjs';

/** Falls back to the movies list when the movie can't be loaded (unknown id, network error). */
export const movieDetailsResolver: ResolveFn<Movie> = (
  route: ActivatedRouteSnapshot,
): Observable<Movie | RedirectCommand> => {
  const movieId = route.paramMap.get('id');
  const moviesService = inject(MoviesService);
  const router = inject(Router);

  if (!movieId) {
    throw new Error('Movie id is required');
  }

  return moviesService
    .getMovieDetails(movieId)
    .pipe(catchError(() => of(new RedirectCommand(router.parseUrl('/movies')))));
};
