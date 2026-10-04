import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  provideRouter,
  RedirectCommand,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';

import { movieDetailsResolver } from './movie-detail.resolver';
import { MoviesService } from '../services/movies.service';

describe('movieDetailsResolver', () => {
  const moviesService = { getMovieDetails: vi.fn() };

  const resolve = (params: Record<string, string>) =>
    TestBed.runInInjectionContext(
      () =>
        movieDetailsResolver(
          { paramMap: convertToParamMap(params) } as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        ) as Observable<unknown>,
    );

  beforeEach(() => {
    moviesService.getMovieDetails.mockReset();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: MoviesService, useValue: moviesService }],
    });
  });

  it('should fetch the movie by the route id', async () => {
    moviesService.getMovieDetails.mockReturnValue(of({ id: 7 }));

    expect(await firstValueFrom(resolve({ id: '7' }))).toEqual({ id: 7 });
    expect(moviesService.getMovieDetails).toHaveBeenCalledWith('7');
  });

  it('should redirect to the movies list when the movie fails to load', async () => {
    moviesService.getMovieDetails.mockReturnValue(throwError(() => new Error('404')));

    const result = await firstValueFrom(resolve({ id: '7' }));

    expect(result).toBeInstanceOf(RedirectCommand);
    expect((result as RedirectCommand).redirectTo.toString()).toBe('/movies');
  });

  it('should throw when the route has no id', () => {
    expect(() => resolve({})).toThrow('Movie id is required');
  });
});
