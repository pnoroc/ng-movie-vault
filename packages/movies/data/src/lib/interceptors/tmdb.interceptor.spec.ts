import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { tmdbInterceptor } from './tmdb.interceptor';
import { TMDB_CONFIG, TmdbConfig } from '../tmdb.config';

describe('tmdbInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  const tmdbConfig: TmdbConfig = {
    apiUrl: 'https://api.themoviedb.org/3',
    token: 'test-token',
    imageUrl: 'test.com',
    apiKey: 'test-api-key',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([tmdbInterceptor])),
        provideHttpClientTesting(),
        {
          provide: TMDB_CONFIG,
          useValue: tmdbConfig,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add the Authorization header to TMDB requests', () => {
    http.get(`${tmdbConfig.apiUrl}/movie/popular`).subscribe();

    const req = httpTestingController.expectOne(
      `${tmdbConfig.apiUrl}/movie/popular`,
    );

    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${tmdbConfig.token}`,
    );

    req.flush({});
  });

  it('should not add the Authorization header to non-TMDB requests', () => {
    const url = 'https://example.com/api/movies';

    http.get(url).subscribe();

    const req = httpTestingController.expectOne(url);

    expect(req.request.headers.has('Authorization')).not.toBeTruthy();

    req.flush({});
  });
});
