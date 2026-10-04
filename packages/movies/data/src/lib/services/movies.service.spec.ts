import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Movie, MovieHttpResponse } from '@org/movies-models';

import { MoviesService } from './movies.service';
import { TMDB_CONFIG } from '../tmdb.config';

describe('MoviesService', () => {
  const apiUrl = 'https://api.test/3';
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  const response = (results: Movie[], total_pages = 1): MovieHttpResponse => ({
    page: 1,
    results,
    total_pages,
  });

  const expectRequest = (path: string) =>
    httpTestingController.expectOne((req) => req.url === `${apiUrl}${path}`);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: TMDB_CONFIG,
          useValue: { apiUrl: 'https://api.test', imageUrl: '', token: '', apiKey: '' },
        },
      ],
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should load popular movies on creation', () => {
    const req = expectRequest('/movie/popular');
    expect(req.request.params.get('page')).toBe('1');
    expect(service.loading()).toBe(true);

    req.flush(response([{ id: 1 }], 2));

    expect(service.movies()).toEqual([{ id: 1 }]);
    expect(service.loading()).toBe(false);
    expect(service.hasMore()).toBe(true);
  });

  it('should search movies by a trimmed keyword', () => {
    expectRequest('/movie/popular').flush(response([{ id: 1 }]));

    service.searchMovies('  matrix ');

    const req = expectRequest('/search/movie');
    expect(req.request.params.get('query')).toBe('matrix');
    req.flush(response([{ id: 2 }]));

    expect(service.query()).toBe('matrix');
    expect(service.movies()).toEqual([{ id: 2 }]);
  });

  it('should load popular movies when searching with an empty keyword', () => {
    expectRequest('/movie/popular').flush(response([]));

    service.searchMovies('   ');

    expectRequest('/movie/popular').flush(response([{ id: 3 }]));
    expect(service.query()).toBe('');
    expect(service.movies()).toEqual([{ id: 3 }]);
  });

  it('should append the next page on loadMore', () => {
    expectRequest('/movie/popular').flush(response([{ id: 1 }], 2));

    service.loadMore();

    const req = expectRequest('/movie/popular');
    expect(req.request.params.get('page')).toBe('2');
    req.flush(response([{ id: 2 }], 2));

    expect(service.movies()).toEqual([{ id: 1 }, { id: 2 }]);
    expect(service.hasMore()).toBe(false);
  });

  it('should set an error when the request fails', () => {
    expectRequest('/movie/popular').flush(null, { status: 500, statusText: 'Error' });

    expect(service.error()).toBe('Could not load movies. Please try again.');
    expect(service.loading()).toBe(false);
  });

  it('should fetch movie details by id', () => {
    expectRequest('/movie/popular').flush(response([]));
    let movie: Movie | undefined;

    service.getMovieDetails('42').subscribe((result) => (movie = result));
    expectRequest('/movie/42').flush({ id: 42, title: 'Test' });

    expect(movie).toEqual({ id: 42, title: 'Test' });
  });
});
