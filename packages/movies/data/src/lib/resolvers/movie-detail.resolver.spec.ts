import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { movieDetailsResolver } from './movie-detail.resolver';
import { MoviesService } from '../services/movies.service';

describe('movieDetailsResolver', () => {
  const moviesService = { getMovieDetails: vi.fn() };

  const resolve = (params: Record<string, string>) =>
    TestBed.runInInjectionContext(() =>
      movieDetailsResolver(
        { paramMap: convertToParamMap(params) } as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

  beforeEach(() => {
    moviesService.getMovieDetails.mockReset();
    TestBed.configureTestingModule({
      providers: [{ provide: MoviesService, useValue: moviesService }],
    });
  });

  it('should fetch the movie by the route id', () => {
    const movie$ = of({ id: 7 });
    moviesService.getMovieDetails.mockReturnValue(movie$);

    expect(resolve({ id: '7' })).toBe(movie$);
    expect(moviesService.getMovieDetails).toHaveBeenCalledWith('7');
  });

  it('should throw when the route has no id', () => {
    expect(() => resolve({})).toThrow('Movie id is required');
  });
});
